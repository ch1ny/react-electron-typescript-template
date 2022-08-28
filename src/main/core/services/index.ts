import { iocBridge } from '../ioc';
import { DConsoleService } from './utils/decorators';

export const consoleService = iocBridge.get(DConsoleService);
