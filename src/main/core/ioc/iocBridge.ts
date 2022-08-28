import { services } from './collections';
import { ServiceIdentifier, SyncDescriptor } from './instantiation';

interface IIocBridge {
	get<T>(id: ServiceIdentifier<T>): T;
}

const cachedServices = new Map<ServiceIdentifier<any>, any>();

export const iocBridge: IIocBridge = {
	get<T>(id: ServiceIdentifier<T>) {
		return (
			cachedServices.get(id) ||
			(() => {
				let serviceInstance = undefined as undefined | T;

				const service = new Proxy(
					{},
					{
						get(_, property: string) {
							if (!serviceInstance) {
								const instanceOrCtor = services.get(id);
								serviceInstance = new (<SyncDescriptor<unknown>>(
									instanceOrCtor
								)).ctor() as T;
							}
							const target = (serviceInstance as any)[property];
							return typeof target === 'function'
								? (...args: any[]) => {
										return target.call(serviceInstance, ...args);
								  }
								: target;
						},
					}
				);

				cachedServices.set(id, service);
				return service as T;
			})()
		);
	},
};
