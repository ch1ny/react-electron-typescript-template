import { app, ipcMain, screen } from 'electron';
import { consoleService, updateService } from './core/services';
import * as CONSTANTS from './utils/constants';
import { mainWindow } from './utils/core';

const { ARGV, screenSize } = CONSTANTS;

export default async () => {
	consoleService.inverse('APP_START');
	ipcMain.handle('APP.ARGV', () => {
		return ARGV;
	});
	ipcMain.handle('APP.VERSION', () => {
		return app.getVersion();
	});
	ipcMain.handle('APP.NAME', () => {
		return app.getName();
	});
	ipcMain.handle('APP.CONSTANT', () => {
		return CONSTANTS;
	});
	ipcMain.on('APP.UPDATE', () => {
		updateService.hotUpdate();
	});
	app.on('ready', () => {
		const { width: screenWidth, height: screenHeight } =
			screen.getPrimaryDisplay().workAreaSize;
		screenSize.width = screenWidth;
		screenSize.height = screenHeight;

		mainWindow.createMainWindow();
	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') app.quit();
	});
};
