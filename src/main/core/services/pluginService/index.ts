/**
 * ⚠️: plugin 功能存在安全风险，请斟酌后使用！
 */

import { consoleService } from "..";
import { services, SyncDescriptor } from "../../ioc";
import { DPluginService } from "../core/decorators";
import { servicesLifecycle } from "../core/serviceLifcycle";
import { ElectronPlugins, PagePlugins } from "./plugins";

export interface IPluginService {
}

export class PluginService implements IPluginService {
    private pagePlugins: PagePlugins;

    constructor() {
        ElectronPlugins.loadElectronPlugins().then(() => {
            consoleService.background('主进程插件加载完毕', 'green');
        });
        this.pagePlugins = PagePlugins.loadPagePlugins();
    }

}

servicesLifecycle.afterGenerateServiceDecorators.onAfterGenerateServiceDecorators(() => {
    services.set(DPluginService, new SyncDescriptor(PluginService, false));
});
