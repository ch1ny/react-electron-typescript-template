import { createServiceDecorator } from '../../ioc';
import { IConsoleService } from '../consoleService';
import { servicesLifecycle } from './serviceLifcycle';

export const DConsoleService = createServiceDecorator<IConsoleService>('consoleService');

servicesLifecycle.afterGenerateServiceDecorators.generatedServiceDecorators();
