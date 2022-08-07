import { mainWindow } from './window';

const { app, screen } = require('electron');

const screenSize: {
	width?: number;
	height?: number;
} = {};

const lifeCycle = {
	start: () => {
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
	},
	quit: app.quit,
};

export { lifeCycle, screenSize };
