import { app } from 'electron';
import path from 'path';
import { parseArgvArrayToJson, parseSingleArgv } from './utils/base/parseArgv';

export const IS_PACKAGED = app.isPackaged;
/**
 * exe 所在的文件夹目录，
 * 例 exe 的完整路径为
 * D:/文件夹/electron.exe
 * 则 EXEPATH 的值为
 * D:/文件夹
 */
export const EXEPATH = path.dirname(app.getPath('exe'));

/**
 * app.asar 根目录，对应开发环境下的 build 文件夹
 */
export const ASAR_ROOT_PATH = path.resolve(__dirname, '..');

export const PRELOAD_DIR = path.resolve(ASAR_ROOT_PATH, 'preload');

export const ARGV = parseArgvArrayToJson(process.argv.slice(2).map(parseSingleArgv));

export const screenSize: {
	width?: number;
	height?: number;
} = {};

export const DATA_PATH = path.resolve(ASAR_ROOT_PATH, '..', '..', 'Data');

export const PLUGIN_DIRNAME = path.resolve(DATA_PATH, 'Plugins');