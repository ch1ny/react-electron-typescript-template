import path from 'path';
import { DATA_PATH } from '../../../constants';
import { services, SyncDescriptor } from "../../ioc";
import { DPluginService } from "../core/decorators";
import { servicesLifecycle } from "../core/serviceLifcycle";

const PLUGIN_DIRNAME = path.resolve(DATA_PATH, 'Plugins');

export interface IPluginService {

}

export class PluginService implements IPluginService {

    constructor() {

    }

}

servicesLifecycle.afterGenerateServiceDecorators.onAfterGenerateServiceDecorators(() => {
    services.set(DPluginService, new SyncDescriptor(PluginService, false));
});
