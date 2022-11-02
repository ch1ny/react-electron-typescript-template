import { iocBridge } from '../ioc';
import { DConsoleService, DUpdateService, DPluginService } from './core/decorators';

export const consoleService = iocBridge.get(DConsoleService);
export const updateService = iocBridge.get(DUpdateService);
export const pluginService = iocBridge.get(DPluginService);