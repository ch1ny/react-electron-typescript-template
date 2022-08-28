import { mainWindow } from './window';

const screenSize: {
	width?: number;
	height?: number;
} = {};

const lifeCycle = {
	start: () => {
		const { app, screen } = require('electron');
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
};

export { lifeCycle, screenSize };
