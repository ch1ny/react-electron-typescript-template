import { ipcMain } from 'electron';
import fse from 'fs-extra';
import path from 'path';
import { PLUGIN_DIRNAME } from '../../../../constants';

interface IPagePlugin {
    entry: string; // 页面入口文件
}

interface IPagePluginCtorProps {
    entry: string; // 页面入口文件
}

export class PagePlugin implements IPagePlugin {
    entry: string;

    constructor(props: IPagePluginCtorProps) {
        const { entry } = props;

        this.entry = entry;
    }
}

export class PagePlugins {
    private static _pagePlugins: PagePlugin[];
    private static async loadPagePlugins() {
        if (PagePlugins._pagePlugins) return;

        this._pagePlugins = [];
        const PAGE_PLUGIN_DIRNAME = path.resolve(PLUGIN_DIRNAME, 'Pages');
        await fse.ensureDir(PAGE_PLUGIN_DIRNAME);
        const plugins = await fse.promises.readdir(PAGE_PLUGIN_DIRNAME);
        await Promise.all(plugins.map(async (pluginDir) => {
            this._pagePlugins.push(
                new PagePlugin({
                    entry: path.resolve(PAGE_PLUGIN_DIRNAME, pluginDir, 'index.js'),
                }),
            );
        }));

        ipcMain.handle('PLUGINS.GET.PAGE_PLUGINS', () => this._pagePlugins);
    }

    constructor() {
        PagePlugins.loadPagePlugins();
    }

    get pagePlugins() {
        return PagePlugins._pagePlugins;
    }
}