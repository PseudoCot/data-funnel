import { OpenDialogOptions } from "electron";
import { SettingsValue } from "./types";

export interface IDialogAPI {
  getFilePath: (key: OpenDialogOptions) => Promise<string | undefined>,
}

export interface ISettingsAPI {
  set: (key: string, value: SettingsValue) => Promise<void>,
  get: (key: string) => Promise<SettingsValue>,
}

declare global {
  interface Window {
    settingsAPI: ISettingsAPI;
    dialogAPI: IDialogAPI;
  }
}