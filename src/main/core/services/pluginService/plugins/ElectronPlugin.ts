import fse from 'fs-extra';
import path from 'path';
import { PLUGIN_DIRNAME } from '../../../../constants';

interface IElectronPlugin {}

class ElectronPlugin implements IElectronPlugin {

    static async loadPlugin(entry: string) {
        console.log(entry);
        const module = require(entry);
        console.log(module);
    }

}

export class ElectronPlugins {
    private static loaded = false;
    static async loadElectronPlugins() {
        if (ElectronPlugins.loaded) return;

        this.loaded = true;
        const ELECTRON_PLUGIN_DIRNAME = path.resolve(PLUGIN_DIRNAME, 'Electrons');
        await fse.ensureDir(ELECTRON_PLUGIN_DIRNAME);
        const plugins = await fse.promises.readdir(ELECTRON_PLUGIN_DIRNAME);
        await Promise.all(plugins.map(async (pluginDir) => {
            const entry = path.resolve(ELECTRON_PLUGIN_DIRNAME, pluginDir, 'index.js');

            const exists = await Promise.all([
                fse.pathExists(entry),
            ]);
            if (!exists[0]) return;

            // TODO: 插件优先级加载
            return await ElectronPlugin.loadPlugin(entry).catch((ex) => {
                console.log(`${entry} 加载出错`);
                console.log(ex);
            });
        }));
    }
}