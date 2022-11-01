import { iocBridge } from '../ioc';
import { DConsoleService, DUpdateService } from './utils/decorators';

export const consoleService = iocBridge.get(DConsoleService);
export const updateService = iocBridge.get(DUpdateService);