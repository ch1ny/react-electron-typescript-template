const path = require('path');
const chalk = require('chalk');
const cp = require('child_process');

const { WEBPACK_COMMAND, ELECTRON_COMMAND } = process.platform === 'win32' ? {
	WEBPACK_COMMAND: 'webpack.cmd',
	ELECTRON_COMMAND: 'electron.cmd'
} : {
	WEBPACK_COMMAND: 'webpack',
	ELECTRON_COMMAND: 'electron'
}

const DIRNAME = path.resolve(__dirname, '..');
// 1. 启动渲染进程
const react = cp.spawn(WEBPACK_COMMAND, ['serve', '--mode', 'development', '--env', 'development'], {
	cwd: DIRNAME,
});
react.unref();

// 2. 启动 electron
cp.execSync('tsc', { cwd: path.resolve(DIRNAME, 'src', 'main') });
const { DEV_PORT, APP_ICON } = require('../config/dev.config');
const electron = cp.spawn(ELECTRON_COMMAND, ['.', `--port=${DEV_PORT}`, `--icon=${APP_ICON}`], {
	cwd: DIRNAME,
});
electron.on('close', () => {
	switch (process.platform) {
		case 'win32':
			cp.exec(`taskkill /pid ${react.pid} /T /F`);
			break;
		case 'darwin':
			cp.exec(`kill -9 ${react.pid}`);
			break;
		// TODO: 完善其他平台下方法
		case 'linux':
			break;
	}
});
electron.stdout.on('data', (data) => {
	console.log(`${data}`);
});
electron.unref();
