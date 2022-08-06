/**
 * @description 【示例模板】 仅作为创建主窗口方法的推荐模板，开发者可根据自身需要对函数进行自定义
 */

import path from 'path';
import url from 'url';
import { ARGV, IS_PACKAGED, PRELOAD_DIR } from '../constants';
import { screenSize } from '../life-cycle';
import { BaseWindowInstance, createBaseWindow, windowList } from './createWindow';

const createMainWindow = () => {
	const { width: screenWidth = 0, height: screenHeight = 0 } = screenSize;
	const { windowKey, window: mainWindow } = createBaseWindow({
		browserWindowName: 'mainWindow',
		autoShow: true,
		browserWindowProps: {
			width: parseInt(`${screenWidth * 0.7}`),
			height: parseInt(`${screenHeight * 0.8}`),
			frame: false,
			transparent: true,
		},
		webPreferences: {
			preload: path.join(PRELOAD_DIR, 'preload.js'),
		},
		onWindowShow: [
			{
				beforeShow: false,
				cb: (window: Electron.BrowserWindow) => {
					window.webContents.openDevTools();
				},
			},
		],
	});
	mainWindowInstance.updateWindowKey(windowKey);

	if (IS_PACKAGED) {
		mainWindow.loadURL(
			url.format({
				pathname: path.resolve(__dirname, '../render/index.html'),
				protocol: 'file:',
				slashes: true,
			})
		);
	} else {
		mainWindow.loadURL(`http://127.0.0.1:${ARGV['--port']}/`);
	}

	return mainWindow;
};

const MainWindowInstance = class extends BaseWindowInstance {
	get mainWindowInstance() {
		const mainWindow = windowList[this.windowKey];
		return mainWindow ? mainWindow : createMainWindow();
	}
	createMainWindow = createMainWindow;
};

const mainWindowInstance = new MainWindowInstance('mainWindow');

export default mainWindowInstance;
