import { app } from 'electron';
import path from 'path';
import { parseArgvArrayToJson, parseSingleArgv } from './utils/parseArgv';

const IS_PACKAGED = app.isPackaged;
/**
 * exe 所在的文件夹目录，
 * 例 exe 的完整路径为
 * D:/文件夹/electron.exe
 * 则 EXEPATH 的值为
 * D:/文件夹
 */
const EXEPATH = path.dirname(app.getPath('exe'));
const PRELOAD_DIR = path.resolve(__dirname, 'preload');

const ARGV = parseArgvArrayToJson(process.argv.slice(2).map(parseSingleArgv));

export { IS_PACKAGED, EXEPATH, PRELOAD_DIR, ARGV };
