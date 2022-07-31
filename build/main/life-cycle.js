"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenSize = exports.lifeCycle = void 0;
const window_1 = require("./window");
const screenSize = {};
exports.screenSize = screenSize;
const lifeCycle = {
    start: () => {
        const { app, screen } = require('electron');
        app.on('ready', () => {
            const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
            screenSize.width = screenWidth;
            screenSize.height = screenHeight;
            window_1.mainWindow.createMainWindow();
        });
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin')
                app.quit();
        });
    },
};
exports.lifeCycle = lifeCycle;
