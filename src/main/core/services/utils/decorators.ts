import { createServiceDecorator } from '../../ioc';
import { IConsoleService } from '../consoleService';
import { IUpdateService } from '../updateService';
import { servicesLifecycle } from './serviceLifcycle';

export const DConsoleService = createServiceDecorator<IConsoleService>('consoleService');
export const DUpdateService = createServiceDecorator<IUpdateService>('updateService');

servicesLifecycle.afterGenerateServiceDecorators.generatedServiceDecorators();
