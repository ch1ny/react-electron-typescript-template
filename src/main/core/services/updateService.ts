import cp from 'child_process';
import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import { EXEPATH } from '../../constants';
import { services, SyncDescriptor } from '../ioc';
import { DUpdateService } from './utils/decorators';
import { servicesLifecycle } from './utils/serviceLifcycle';

const ContentsParentDir = path.resolve(EXEPATH, '../..');

export interface IUpdateService {
  beforeStartApp: () => void;
  writeUpdatePackage: (data: Buffer) => Promise<void>;
  hotUpdate: () => void;
}

export class UpdateService implements IUpdateService {
  constructor() {
    ipcMain.on('APP.UPDATE', () => {
      this.hotUpdate();
    });
  }

  /**
   * 应用启动前检查是否存在未使用的更新包
   */
  beforeStartApp() {
    switch(process.platform) {
      case 'darwin':
        this.beforeStartAppDarwin();
        break;
      default:
        // no-op;
    }
  }

  private beforeStartAppDarwin() {
    if (!fs.existsSync(path.resolve(ContentsParentDir, 'update.tar.gz'))) return;

    this.hotUpdateDarwin();
  }

  /**
   * 将更新包置于本地
   */
  async writeUpdatePackage(data: Buffer) {
    switch(process.platform) {
      case 'darwin':
        await this.writeDarwinUpdatePackage(data);
        break;
      default:
        // no-op;
    }
  }

  async writeDarwinUpdatePackage(data: Buffer) {
    await fs.promises.writeFile(path.resolve(ContentsParentDir, 'update.tar.gz'), data, 'binary');
  }

  /**
   * 热更新函数
   */
  hotUpdate() {
    switch(process.platform) {
      case 'darwin':
        this.hotUpdateDarwin();
        break;
      default:
        // no-op;
    }
  }

  private hotUpdateDarwin() {
    const { spawn } = cp;
    const child = spawn(
      path.resolve(ContentsParentDir, 'updater'),
      [
        `kill -9 ${process.pid}`,
        `open ${path.dirname(path.resolve(EXEPATH, '..'))}`,
      ],
      {
        detached: true,
        cwd: ContentsParentDir,
      }
    );
    child.unref();
  }
}

servicesLifecycle.afterGenerateServiceDecorators.onAfterGenerateServiceDecorators(() => {
	services.set(DUpdateService, new SyncDescriptor(UpdateService));
});
