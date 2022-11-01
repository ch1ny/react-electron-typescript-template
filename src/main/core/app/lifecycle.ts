import { updateService } from '../services';

export const lifecycle = {
	beforeStartApp: async () => {
		await import('../services');

		updateService.beforeStartApp();
	},
	startApp: async function () {
		await (this as any).beforeStartApp();
		const appFunction = (await import('../../main')) as any;
		await appFunction.default();
	},
} as {
	startApp: Function;
};
