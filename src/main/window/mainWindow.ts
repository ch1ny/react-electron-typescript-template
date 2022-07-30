import { BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import { IS_PACKAGED, PRELOAD_DIR } from '../constants';
import { screenSize } from '../life-cycle';

let mainWindow: BrowserWindow;

const createMainWindow = () => {
	const { width: screenWidth = 0, height: screenHeight = 0 } = screenSize;
	mainWindow = new BrowserWindow({
		width: parseInt(`${screenWidth * 0.7}`),
		height: parseInt(`${screenHeight * 0.8}`),
		frame: false,
		transparent: true,
		show: false,
		// icon: path.join(DIRNAME, 'electronAssets', 'favicon.ico'),
		webPreferences: {
			preload: path.join(PRELOAD_DIR, 'preload.js'),
			devTools: !IS_PACKAGED,
		},
	});

	mainWindow.on('ready-to-show', mainWindow.show);

	if (IS_PACKAGED) {
		mainWindow.loadURL(
			url.format({
				pathname: path.resolve(__dirname, '../render/index.html'),
				protocol: 'file:',
				slashes: true,
			})
		);
	} else {
		mainWindow.loadURL('http://127.0.0.1:7000/');
	}

	return mainWindow;
};

const MainWindow = class {
	get mainWindowInstance() {
		return mainWindow ? mainWindow : createMainWindow();
	}
	createMainWindow = createMainWindow;
};

export default new MainWindow();
