import { OpenDialogOptions } from "electron";
import { SettingsValue } from "./types";

export interface IDialogAPI {
  getFilePath: (key: OpenDialogOptions) => Promise<string | undefined>,
  showMessageBox: (options: MessageBoxOptions) => Promise<number>,
  showMessageBoxSync: (options: MessageBoxOptions) => Promise<number>,
  openFile: (filePath: string) => void,
}

export interface ISettingsAPI {
  set: (key: string, value: SettingsValue) => Promise<void>,
  get: (key: string) => Promise<SettingsValue>,
  reset: () => Promise<void>,
}

export interface ICollectionAPI {
  // error string, or else ''
  collectCountersData: (saveRawData?: boolean) => Promise<string>,
  onConsoleLog: (callback: (value) => void) => void,
  onFetchHtml: (callback: (value) => void) => void,
  processHtml: (html: string) => Promise<string[]>,
}

declare global {
  interface Window {
    settingsAPI: ISettingsAPI;
    dialogAPI: IDialogAPI;
    collectionAPI: ICollectionAPI;
  }
}