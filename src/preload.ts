import { contextBridge, ipcRenderer, OpenDialogOptions } from "electron";

contextBridge.exposeInMainWorld('dialogAPI', {
  getFilePath: (options: OpenDialogOptions) => ipcRenderer.invoke('dialog:getFilePath', options)
})

contextBridge.exposeInMainWorld('settingsAPI', {
  set: (key: string, value: string) => ipcRenderer.invoke('settings:set', key, value),
  get: (key: string) => ipcRenderer.invoke('settings:get', key),
})