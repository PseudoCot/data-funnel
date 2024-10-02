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
  win.webContents.send('collection:consoleLog', 'main process start');
  const newFilePaths: string[] = [];
  showProgressInTaskbar(win, 0.2);

  win.webContents.send('collection:consoleLog', 'getCountersDataFromHtml start');
  await getCountersDataFromHtml(html)

    .then(async (data) => {
      win.webContents.send('collection:consoleLog', 'getCountersDataFromHtml end');
      showProgressInTaskbar(win, 0.4);
      if (await settings.get('data.saveSharedSheet')) {
        win.webContents.send('collection:consoleLog', 'writeCountersDataToSharedSheet start');
        const filePath = await writeCountersDataToSharedSheet(data);
        win.webContents.send('collection:consoleLog', 'writeCountersDataToSharedSheet end');
        newFilePaths.push(filePath);
      }
      showProgressInTaskbar(win, 0.6);
      if (await settings.get('data.saveSeparatedSheets')) {
        win.webContents.send('collection:consoleLog', 'writeCountersDataToSeparatedSheet start');
        const filePath = await writeCountersDataToSeparatedSheet(data);
        win.webContents.send('collection:consoleLog', 'writeCountersDataToSeparatedSheet end');
        newFilePaths.push(filePath);
      }
      return data;
    })

    .then(async (data) => {
      showProgressInTaskbar(win, 0.8);
      if (saveRawData || !!(await settings.get('data.saveRawData'))) {
        win.webContents.send('collection:consoleLog', 'prepareCountersDataForTsvFile start');
        const tsvData = prepareCountersDataForTsvFile(data);
        win.webContents.send('collection:consoleLog', 'prepareCountersDataForTsvFile end');
        showProgressInTaskbar(win, 0.9);
        win.webContents.send('collection:consoleLog', 'writeCountersDataToTsvFile start');
        const filePath = await writeCountersDataToTsvFile(tsvData);
        win.webContents.send('collection:consoleLog', 'writeCountersDataToTsvFile end');
        newFilePaths.push(filePath);
      }
    })

    .then(() => {
      win.webContents.send('collection:consoleLog', 'main process end');
      showProgressInTaskbar(win, 1);
      notifyUserInTaskbar(win);
      setTimeout(() => showProgressInTaskbar(win, 0, 'none'), 3000);
    })

    .catch(() => {
      showProgressInTaskbar(win, 0, 'error')
    });

  return newFilePaths;
}