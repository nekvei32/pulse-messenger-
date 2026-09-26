const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pulseSession', {
  get: () => ipcRenderer.invoke('pulse:token:get'),
  set: (token) => ipcRenderer.invoke('pulse:token:set', token),
  clear: () => ipcRenderer.invoke('pulse:token:clear'),
});
contextBridge.exposeInMainWorld('pulseScreen', {
  list: () => ipcRenderer.invoke('screen:list'),
});