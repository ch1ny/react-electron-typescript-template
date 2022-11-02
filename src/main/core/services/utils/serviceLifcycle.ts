export const servicesLifecycle = {
	afterGenerateServiceDecorators: {
		callbacks: [] as Function[],
		onAfterGenerateServiceDecorators(callback: Function) {
			this.callbacks.push(callback);
		},
		async generatedServiceDecorators() {
			await import('../instance');

			this.callbacks.forEach((cb) => {
				cb.call(this);
			});
		},
	},
};
