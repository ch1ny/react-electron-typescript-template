import { ipcMain } from 'electron';
import { ARGV } from './constants';
import { lifeCycle } from './life-cycle';

ipcMain.handle('APP.ARGV', () => {
	return ARGV;
});

lifeCycle.start();
