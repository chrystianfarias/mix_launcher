const { contextBridge, ipcRenderer, app } = require('electron');
const { dialog, BrowserWindow } = require("electron");


contextBridge.exposeInMainWorld(
  "api", {
      send: (channel, data) => {
          // whitelist channels
          //let validChannels = ["ModController.installMod", "App.quit"];
          //if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
          //}
      },
      receive: (channel, func) => {
          //let validChannels = ["fromMain"];
          //if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender`
          ipcRenderer.on(channel, (event, ...args) => func(...args));
          //}
      },
      getVersion: () => app.getVersion()
  }
);
