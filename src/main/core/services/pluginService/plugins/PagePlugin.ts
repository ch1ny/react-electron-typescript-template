import { ipcMain } from 'electron';
import fse from 'fs-extra';
import path from 'path';
import { PLUGIN_DIRNAME } from '../../../../constants';

interface IPagePlugin {
    entry: string; // 页面入口文件
    pageName: string; // 页面名称
}

interface IPagePluginCtorProps {
    entry: string; // 页面入口文件
    pageName: string; // 页面名称
}

export class PagePlugin implements IPagePlugin {
    entry: string;
    pageName: string;

    constructor(props: IPagePluginCtorProps) {
        const { entry, pageName } = props;

        this.entry = entry;
        this.pageName = pageName;
    }
}

export class PagePlugins {
    private static _pagePlugins: PagePlugin[];
    static async loadPagePlugins() {
        if (PagePlugins._pagePlugins) return;

        this._pagePlugins = [];
        ipcMain.handle('PLUGINS.GET.PAGE_PLUGINS', () => this._pagePlugins);

        const PAGE_PLUGIN_DIRNAME = path.resolve(PLUGIN_DIRNAME, 'Pages');
        await fse.ensureDir(PAGE_PLUGIN_DIRNAME);
        const plugins = await fse.promises.readdir(PAGE_PLUGIN_DIRNAME);
        await Promise.all(plugins.map(async (pluginDir) => {
            const entry = path.resolve(PAGE_PLUGIN_DIRNAME, pluginDir, 'index.umd.js');
            const packageJson = path.resolve(PAGE_PLUGIN_DIRNAME, pluginDir, 'package.json');
            const exists = await Promise.all([ fse.pathExists(entry), fse.pathExists(packageJson) ]);
            if (!exists[0] || !exists[1]) return;
            const json = await fse.readJSON(packageJson);
            if (!json?.name) return;
            const regex = new RegExp(`(.*?)(${json.name})$`);
            if (!regex.test(pluginDir)) return;

            this._pagePlugins.push(
                new PagePlugin({
                    entry,
                    pageName: json.name,
                }),
            );
        }));
    }

    static get pagePlugins() {
        return PagePlugins._pagePlugins;
    }
}