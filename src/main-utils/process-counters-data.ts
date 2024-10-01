import settings from 'electron-settings';
import { getCountersDataFromHtml } from './get-counters-data-from-html';
import { prepareCountersDataForTsvFile } from './prepare-counters-data-for-tsv-file';
import { writeCountersDataToTsvFile } from './write-counters-data-to-tsv-file';
import { writeCountersDataToSeparatedSheet } from './write-counters-data-to-separated-sheet';
import { notifyUserInTaskbar } from './notify-user-in-taskbar';
import { BrowserWindow } from 'electron';
import { showProgressInTaskbar } from './show-progress-in-taskbar';
import { writeCountersDataToSharedSheet } from './write-counters-data-to-shared-sheet';

export async function processCountersData(win: BrowserWindow, html: string, saveRawData?: boolean) {
  const newFilePaths: string[] = [];
  showProgressInTaskbar(win, 0.2);

  await getCountersDataFromHtml(html)

    .then(async (data) => {
      showProgressInTaskbar(win, 0.4);
      if (settings.getSync('data.saveSharedSheet')) {
        const filePath = await writeCountersDataToSharedSheet(data)
        newFilePaths.push(filePath);
      }
      showProgressInTaskbar(win, 0.6);
      if (settings.getSync('data.saveSeparatedSheets')) {
        const filePath = await writeCountersDataToSeparatedSheet(data)
        newFilePaths.push(filePath);
      }
      return data;
    })

    .then(async (data) => {
      showProgressInTaskbar(win, 0.8);
      if (saveRawData || !!(await settings.get('data.saveRawData'))) {
        const tsvData = prepareCountersDataForTsvFile(data);
        showProgressInTaskbar(win, 0.9);
        const filePath = await writeCountersDataToTsvFile(tsvData)
        newFilePaths.push(filePath);
      }
    })

    .then(() => {
      showProgressInTaskbar(win, 1);
      notifyUserInTaskbar(win);
      setTimeout(() => showProgressInTaskbar(win, 0, 'none'), 3000);
    })

    .catch(() => {
      showProgressInTaskbar(win, 0, 'error')
    });

  return newFilePaths;
}