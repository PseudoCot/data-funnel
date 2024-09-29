import { updateSettingByEventCreator } from "../renderer-utils/update-setting-by-event-creator";

const dataFetchingUrlInput = document.getElementById('data-fetching-url-input') as HTMLInputElement;
const dataSheetPathText = document.getElementById('data-sheet-path');
const dataSheetSelectBtn = document.getElementById('select-data-sheet-btn') as HTMLButtonElement;

const notifyCheckbox = document.getElementById('notify-checkbox') as HTMLInputElement;
const autorunCheckbox = document.getElementById('autorun-checkbox') as HTMLInputElement;
const powerSaveBlokCheckbox = document.getElementById('power-save-block-checkbox') as HTMLInputElement;
const fullAppQuitCheckbox = document.getElementById('full-app-quit-checkbox') as HTMLInputElement;

const rawDataSavingCheckbox = document.getElementById('save-raw-data-checkbox') as HTMLInputElement;
const rawDataDirPathText = document.getElementById('raw-data-dir-path');
const rawDataDirSelectBtn = document.getElementById('select-raw-data-dir-btn') as HTMLButtonElement;

const loggingCheckbox = document.getElementById('logging-checkbox') as HTMLInputElement;


export function setSettingsInitialValues() {
  window.settingsAPI.get('data.fetchingUrl').then((v) => (dataFetchingUrlInput.value = v.toString()));
  window.settingsAPI.get('data.sheetFilePath').then((v) => (dataSheetPathText.innerText = v?.toString() || 'Не выбрано'));
  window.settingsAPI.get('settings.notificationsEnabled').then((v) => (notifyCheckbox.checked = !!v));
  window.settingsAPI.get('settings.autorunEnabled').then((v) => (autorunCheckbox.checked = !!v));
  window.settingsAPI.get('settings.powerSaveBlockerEnabled').then((v) => (powerSaveBlokCheckbox.checked = !!v));
  window.settingsAPI.get('settings.fullAppQuitEnabled').then((v) => (fullAppQuitCheckbox.checked = !!v));
  window.settingsAPI.get('rawData.savingEnabled').then((v) => (rawDataSavingCheckbox.checked = !!v));
  window.settingsAPI.get('rawData.dirPath').then((v) => (rawDataDirPathText.innerText = v?.toString() || 'Не выбрано'));
  window.settingsAPI.get('logging.loggingEnabled').then((v) => (loggingCheckbox.checked = !!v));
}

export function setSettingsHandlers() {
  dataFetchingUrlInput.onchange = updateSettingByEventCreator('data.fetchingUrl');
  dataSheetSelectBtn.onclick = handleSheetSelectBtnClick;

  notifyCheckbox.onchange = updateSettingByEventCreator('settings.notificationsEnabled', true);
  autorunCheckbox.onchange = updateSettingByEventCreator('settings.autorunEnabled', true);
  powerSaveBlokCheckbox.onchange = updateSettingByEventCreator('settings.powerSaveBlockerEnabled', true);
  fullAppQuitCheckbox.onchange = updateSettingByEventCreator('settings.fullAppQuitEnabled', true);

  rawDataSavingCheckbox.onchange = updateSettingByEventCreator('rawData.savingEnabled', true);
  rawDataDirSelectBtn.onclick = handleRowDataDirSelectBtnClick;

  loggingCheckbox.onchange = updateSettingByEventCreator('logging.enabled', true);
}

export function clearSettingsHandlers() {
  dataFetchingUrlInput.onchange = undefined;
  dataSheetSelectBtn.onclick = undefined;

  notifyCheckbox.onchange = undefined;
  autorunCheckbox.onchange = undefined;
  powerSaveBlokCheckbox.onchange = undefined;
  fullAppQuitCheckbox.onchange = undefined;

  rawDataSavingCheckbox.onchange = undefined;
  rawDataDirSelectBtn.onclick = undefined;

  loggingCheckbox.onchange = undefined;
}


async function handleSheetSelectBtnClick() {
  const filePath = await window.dialogAPI.getFilePath({
    filters: [
      { name: 'Sheets', extensions: ['xlsx', 'xls'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile'],
  });

  if (filePath) {
    dataSheetPathText.innerText = filePath;
    await window.settingsAPI.set('data.sheetFilePath', filePath)
  }
}

async function handleRowDataDirSelectBtnClick() {
  const dirPath = await window.dialogAPI.getFilePath({
    properties: ['openDirectory'],
  });

  if (dirPath) {
    rawDataDirPathText.innerText = dirPath;
    await window.settingsAPI.set('rawData.dirPath', dirPath)
  }
}