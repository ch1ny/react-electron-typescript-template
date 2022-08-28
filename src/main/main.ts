import { app, ipcMain, screen } from 'electron';
import { consoleService } from './core/services';
import { ARGV, screenSize } from './utils/constants';
import { mainWindow } from './utils/core';

export default async () => {
	consoleService.inverse('APP_START');
	ipcMain.handle('APP.ARGV', () => {
		return ARGV;
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
