import { createServiceDecorator } from '../../ioc';
import { IConsoleService } from '../consoleService';
import { IPluginService } from '../pluginService';
import { IUpdateService } from '../updateService';
import { servicesLifecycle } from './serviceLifcycle';

export const DConsoleService = createServiceDecorator<IConsoleService>('consoleService');
export const DUpdateService = createServiceDecorator<IUpdateService>('updateService');
export const DPluginService = createServiceDecorator<IPluginService>('pluginService');

servicesLifecycle.afterGenerateServiceDecorators.generatedServiceDecorators();
