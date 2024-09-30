import { BrowserWindow } from "electron";
import { ProgressType } from "../types/types";

const TIME_TO_SHOW_PROGRESS = 600000; // 10 минут

export function showProgressInTaskbar(win: BrowserWindow, progress: number,
  mode: ProgressType = 'normal', timeToShow?: number) {
  win.setProgressBar(progress, { mode: mode });
  setTimeout(() => win.setProgressBar(progress), timeToShow ?? TIME_TO_SHOW_PROGRESS)
}
