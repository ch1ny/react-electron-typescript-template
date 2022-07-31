"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const constants_1 = require("../constants");
const life_cycle_1 = require("../life-cycle");
let mainWindow;
const createMainWindow = () => {
    const { width: screenWidth = 0, height: screenHeight = 0 } = life_cycle_1.screenSize;
    mainWindow = new electron_1.BrowserWindow({
        width: parseInt(`${screenWidth * 0.7}`),
        height: parseInt(`${screenHeight * 0.8}`),
        frame: false,
        transparent: true,
        show: false,
        webPreferences: {
            preload: path_1.default.join(constants_1.PRELOAD_DIR, 'preload.js'),
            devTools: !constants_1.IS_PACKAGED,
        },
    });
    mainWindow.on('ready-to-show', mainWindow.show);
    if (constants_1.IS_PACKAGED) {
        mainWindow.loadURL(url_1.default.format({
            pathname: path_1.default.resolve(__dirname, '../render/index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }
    else {
        mainWindow.loadURL('http://127.0.0.1:7000/');
    }
    return mainWindow;
};
const MainWindow = class {
    constructor() {
        this.createMainWindow = createMainWindow;
    }
    get mainWindowInstance() {
        return mainWindow ? mainWindow : createMainWindow();
    }
};
exports.default = new MainWindow();
