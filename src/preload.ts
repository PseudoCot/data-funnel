import { contextBridge, ipcRenderer, MessageBoxOptions, OpenDialogOptions } from "electron";

contextBridge.exposeInMainWorld('dialogAPI', {
  getFilePath: (options: OpenDialogOptions) => ipcRenderer.invoke('dialog:getFilePath', options),
  showMessageBox: (options: MessageBoxOptions) => ipcRenderer.invoke('dialog:showMessageBox', options),
  showMessageBoxSync: (options: MessageBoxOptions) => ipcRenderer.invoke('dialog:showMessageBoxSync', options),
});

contextBridge.exposeInMainWorld('settingsAPI', {
  set: (key: string, value: string) => ipcRenderer.invoke('settings:set', key, value),
  get: (key: string) => ipcRenderer.invoke('settings:get', key),
  reset: () => ipcRenderer.invoke('settings:reset'),
});

contextBridge.exposeInMainWorld('collectionAPI', {
  collectCountersData: (saveRawData?: boolean) => ipcRenderer.send('collection:collect', saveRawData),

  onFetchHtml: (callback: (url: string) => Promise<unknown>) =>
    ipcRenderer.on('collection:fetchHtml', (_, value) => callback(value)),
  processHtml: (html: string) => ipcRenderer.invoke('collection:processHtml', html)
});
