/**
 * ⚠️: plugin 功能存在安全风险，请斟酌后使用！
 */

import { services, SyncDescriptor } from "../../ioc";
import { DPluginService } from "../core/decorators";
import { servicesLifecycle } from "../core/serviceLifcycle";
import { PagePlugins } from "./plugins";

export interface IPluginService {
}

export class PluginService implements IPluginService {
    private pagePlugins: PagePlugins;

    constructor() {
        this.pagePlugins = new PagePlugins();
    }

}

servicesLifecycle.afterGenerateServiceDecorators.onAfterGenerateServiceDecorators(() => {
    services.set(DPluginService, new SyncDescriptor(PluginService, false));
});
