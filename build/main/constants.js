"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRELOAD_DIR = exports.EXEPATH = exports.IS_PACKAGED = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const IS_PACKAGED = electron_1.app.isPackaged;
exports.IS_PACKAGED = IS_PACKAGED;
const EXEPATH = path_1.default.dirname(electron_1.app.getPath('exe'));
exports.EXEPATH = EXEPATH;
const PRELOAD_DIR = path_1.default.resolve(__dirname, 'preload');
exports.PRELOAD_DIR = PRELOAD_DIR;
