import settings from 'electron-settings';
import { getCountersDataFromHtml } from './get-counters-data-from-html';
import { prepareCountersDataForTsvFile } from './prepare-counters-data-for-tsv-file';
import { writeCountersDataToTsvFile } from './write-counters-data-to-tsv-file';
import { writeCountersDataToSheetFile } from './write-counters-data-to-sheet-file';
import { notifyUserInTaskbar } from './notify-user-in-taskbar';
import { BrowserWindow } from 'electron';
import { showProgressInTaskbar } from './show-progress-in-taskbar';

export function processCountersData(win: BrowserWindow, html: string, saveRawData?: boolean) {
  showProgressInTaskbar(win, 0.25);
  return getCountersDataFromHtml(html)
    .then((data) => {
      showProgressInTaskbar(win, 0.5);
      writeCountersDataToSheetFile(data);
      return data;
    })
    .then(async (data) => {
      showProgressInTaskbar(win, 0.75);
      if (saveRawData || !!settings.getSync('rawData.savingEnabled')) {
        const tsvData = await prepareCountersDataForTsvFile(data);
        showProgressInTaskbar(win, 0.90);
        writeCountersDataToTsvFile(tsvData);
      }
    })
    .then(() => {
      showProgressInTaskbar(win, 1);
      notifyUserInTaskbar(win);
    })
    .catch(() => {
      showProgressInTaskbar(win, 1, 'error')
    });
}