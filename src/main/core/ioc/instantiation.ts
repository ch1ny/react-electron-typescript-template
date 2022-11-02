/**
 * Identifies a service of type T
 */
export interface ServiceIdentifier<T> {
	// service only id
	(...args: any[]): void;
	type: T;
}

// ------ internal util
export namespace _util {
	export const serviceIds = new Map<string, ServiceIdentifier<any>>();
}

/**
 * The *only* valid way to create a {{ServiceIdentifier}}.
 */
export function createServiceDecorator<T>(serviceId: string): ServiceIdentifier<T> {
	if (_util.serviceIds.has(serviceId)) {
		return _util.serviceIds.get(serviceId)!;
	}

	const id = <ServiceIdentifier<T>>function (target: object, key: string): any {
		import('./iocBridge').then(({ iocBridge }) => {
			(<any>target)[key] = iocBridge.get(id);
		});
	};

	id.toString = () => serviceId;

	_util.serviceIds.set(serviceId, id);

	return id;
}

export class SyncDescriptor<T> {
	readonly ctor!: new (...args: any[]) => T; // constructor function of service
	readonly staticArguments!: any[]; // arguments needed by service while initing
	readonly supportsDelayedInstantiation!: boolean; // allow delayed initing

	constructor(
		ctor: new (...args: any[]) => T,
		supportsDelayedInstantiation: boolean = true,
		staticArguments: any[] = []
	) {
		if (!supportsDelayedInstantiation) return new ctor(...staticArguments) as any;

		this.ctor = ctor;
		this.staticArguments = staticArguments;
		this.supportsDelayedInstantiation = supportsDelayedInstantiation;
	}
}
