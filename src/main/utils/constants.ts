import { app } from 'electron';
import path from 'path';
import { parseArgvArrayToJson, parseSingleArgv } from './base/parseArgv';

const IS_PACKAGED = app.isPackaged;
/**
 * exe 所在的文件夹目录，
 * 例 exe 的完整路径为
 * D:/文件夹/electron.exe
 * 则 EXEPATH 的值为
 * D:/文件夹
 */
const EXEPATH = path.dirname(app.getPath('exe'));

/**
 * app.asar 根目录，对应开发环境下的 build 文件夹
 */
const ASAR_ROOT_PATH = path.resolve(__dirname, '..');

const PRELOAD_DIR = path.resolve(__dirname, 'preload');

const ARGV = parseArgvArrayToJson(process.argv.slice(2).map(parseSingleArgv));

const screenSize: {
	width?: number;
	height?: number;
} = {};

export { IS_PACKAGED, EXEPATH, PRELOAD_DIR, ASAR_ROOT_PATH, ARGV, screenSize };
