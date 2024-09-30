import { contextBridge, ipcRenderer, OpenDialogOptions } from "electron";

contextBridge.exposeInMainWorld('dialogAPI', {
  getFilePath: (options: OpenDialogOptions) => ipcRenderer.invoke('dialog:getFilePath', options)
});

contextBridge.exposeInMainWorld('settingsAPI', {
  set: (key: string, value: string) => ipcRenderer.invoke('settings:set', key, value),
  get: (key: string) => ipcRenderer.invoke('settings:get', key),
  setDefault: () => ipcRenderer.send('settings:setDefault'),
});

contextBridge.exposeInMainWorld('collectionAPI', {
  collectCountersData: () => ipcRenderer.send('collection:collect'),

  onFetchHtml: (callback: (url: string) => Promise<unknown>) =>
    ipcRenderer.on('collection:fetchHtml', (_, value) => callback(value)),
  processHtml: (html: string) => ipcRenderer.invoke('collection:processHtml', html)
});
