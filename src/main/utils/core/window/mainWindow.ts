/**
 * @description 【示例模板】 仅作为创建主窗口方法的推荐模板，开发者可根据自身需要对函数进行自定义
 */

import { app } from 'electron';
import path from 'path';
import url from 'url';
import { ARGV, ASAR_ROOT_PATH, IS_PACKAGED, PRELOAD_DIR, screenSize } from '../../../constants';
import { createMenu } from '../menu';
import { createTray } from '../tray';
import { BaseWindowInstance, createBaseWindow, windowList } from './createWindow';

const createMainWindow = () => {
	const APP_ICON = IS_PACKAGED
		? path.resolve(ASAR_ROOT_PATH, 'app_icon.ico')
		: `${ARGV['--icon']}`;
	const { width: screenWidth = 0, height: screenHeight = 0 } = screenSize;
	const { windowKey, window: mainWindow } = createBaseWindow({
		browserWindowName: 'mainWindow',
		autoShow: true,
		icon: APP_ICON,
		browserWindowProps: {
			width: parseInt(`${screenWidth * 0.7}`),
			height: parseInt(`${screenHeight * 0.8}`),
			frame: false,
			transparent: true,
		},
		webPreferences: {
			preload: path.join(PRELOAD_DIR, 'preload.js'),
			webSecurity: false
		},
		onWindowShow: [
			{
				beforeShow: false,
				cb: (window: Electron.BrowserWindow) => {
					window.webContents.openDevTools();
				},
			},
			{
				beforeShow: false,
				cb: (window: Electron.BrowserWindow) => {
					createTray(
						APP_ICON,
						createMenu({
							template: [
								{
									label: '退出',
									click: () => {
										app.quit();
									},
								},
							],
						}),
						'React + Electron + TypeScript 模板示例',
						() => {
							window.center();
						}
					);
				},
			},
		],
	});
	mainWindowInstance.updateWindowKey(windowKey);

	if (IS_PACKAGED) {
		mainWindow.loadURL(
			url.format({
				pathname: path.resolve(ASAR_ROOT_PATH, './render/index.html'),
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
