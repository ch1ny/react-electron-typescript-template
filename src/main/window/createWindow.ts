import { app, BrowserWindow } from 'electron';

export interface IBaseWindowProps {
	width: number;
	height: number;
	frame?: boolean;
	transparent?: boolean;
	// show: boolean,
}

export interface ICreateBaseWindowProps {
	browserWindowName: string;
	autoShow?: boolean;
	browserWindowProps?: IBaseWindowProps;
	webPreferences?: Electron.WebPreferences;
	onWindowShow?: { beforeShow: boolean; cb: (window: Electron.BrowserWindow) => void }[];
}

export const windowList: Record<string, Electron.BrowserWindow> = {};

export const createBaseWindow = ({
	browserWindowName,
	autoShow = true,
	browserWindowProps,
	webPreferences,
	onWindowShow,
}: ICreateBaseWindowProps) => {
	let windowKey = `${browserWindowName}`;
	while (windowList[windowKey]) {
		windowKey = `${browserWindowName}_${Date.now()}`;
	}

	const window = new BrowserWindow({
		...browserWindowProps,
		show: false,
		webPreferences: {
			devTools: !app.isPackaged,
			...webPreferences,
		},
	});

	window.on('ready-to-show', () => {
		onWindowShow
			?.filter(({ beforeShow }) => beforeShow)
			.forEach(({ cb }) => {
				cb(window);
			});
		if (autoShow) window.show();
		onWindowShow
			?.filter(({ beforeShow }) => !beforeShow)
			.forEach(({ cb }) => {
				cb(window);
			});
	});

	windowList[windowKey] = window;

	return {
		windowKey,
		window,
	};
};

export class BaseWindowInstance {
	constructor(windowKey: string) {
		this.windowKey = windowKey;
	}
	updateWindowKey(key: string) {
		this.windowKey = key;
	}
	protected windowKey: string;
}
