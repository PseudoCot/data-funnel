import { BrowserWindow } from "electron";

export function notifyUserInTaskbar(win: BrowserWindow) {
  win.once('focus', () => win.flashFrame(false));
  win.flashFrame(true);
}
