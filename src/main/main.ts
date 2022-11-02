import { app, ipcMain, screen } from 'electron';
import { consoleService } from './core/services';
import * as CONSTANTS from './constants';
import { mainWindow } from './utils/core';

const { screenSize } = CONSTANTS;

export default async () => {
	consoleService.inverse('APP_START');
	ipcMain.handle('APP.VERSION', () => {
		return app.getVersion();
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
