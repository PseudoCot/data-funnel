import settings from 'electron-settings';
import { getCountersDataFromHtml } from './get-counters-data-from-html';
import { prepareCountersDataForTsvFile } from './prepare-counters-data-for-tsv-file';
import { writeCountersDataToTsvFile } from './write-counters-data-to-tsv-file';
import { writeCountersDataToSeparatedSheet } from './write-counters-data-to-separated-sheet';
import { notifyUserInTaskbar } from './notify-user-in-taskbar';
import { BrowserWindow } from 'electron';
import { showProgressInTaskbar } from './show-progress-in-taskbar';
import { writeCountersDataToSharedSheet } from './write-counters-data-to-shared-sheet';

export function processCountersData(win: BrowserWindow, html: string, saveRawData?: boolean) {
  showProgressInTaskbar(win, 0.2);

  return getCountersDataFromHtml(html)

    .then((data) => {
      showProgressInTaskbar(win, 0.4);
      if (settings.getSync('data.saveSharedSheet')) {
        writeCountersDataToSharedSheet(data);
      }
      showProgressInTaskbar(win, 0.6);
      if (settings.getSync('data.saveSeparatedSheets')) {
        writeCountersDataToSeparatedSheet(data);
      }
      return data;
    })

    .then((data) => {
      showProgressInTaskbar(win, 0.8);
      if (saveRawData || !!settings.getSync('data.saveRawData')) {
        const tsvData = prepareCountersDataForTsvFile(data);
        showProgressInTaskbar(win, 0.9);
        return writeCountersDataToTsvFile(tsvData);
      }
    })

    .then(() => {
      showProgressInTaskbar(win, 1);
      notifyUserInTaskbar(win);
      setTimeout(() => showProgressInTaskbar(win, 0, 'none'), 5000);
    })

    .catch(() => {
      showProgressInTaskbar(win, 1, 'error')
    });
}