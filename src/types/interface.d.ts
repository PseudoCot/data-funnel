import { OpenDialogOptions } from "electron";
import { SettingsValue } from "./types";

export interface IDialogAPI {
  getFilePath: (key: OpenDialogOptions) => Promise<string | undefined>,
}

export interface ISettingsAPI {
  set: (key: string, value: SettingsValue) => Promise<void>,
  get: (key: string) => Promise<SettingsValue>,
}

export interface ICollectionAPI {
  // error string, or else ''
  collectCountersData: () => Promise<string>,
  onFetchHtml: (callback: (value) => void) => void,
  processHtml: (html: string) => void,
}

declare global {
  interface Window {
    settingsAPI: ISettingsAPI;
    dialogAPI: IDialogAPI;
    collectionAPI: ICollectionAPI;
  }
}