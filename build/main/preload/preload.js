"use strict";
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('ipc', Object.assign(Object.assign({}, ipcRenderer), { on: (channel, cb) => {
        ipcRenderer.on(channel, cb);
    }, once: (channel, cb) => {
        ipcRenderer.once(channel, cb);
    }, removeListener: (channel, cb) => {
        ipcRenderer.removeListener(channel, cb);
    } }));
