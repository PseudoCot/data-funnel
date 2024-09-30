import { MessageBoxOptions } from "electron";
import { updateSettingByEventCreator } from "../renderer-utils/update-setting-by-event-creator";
import { setPlanningInitialValues } from "./planning";

const dataFetchingUrlInput = document.getElementById('data-fetching-url-input') as HTMLInputElement;
const templateSheetPathEl = document.getElementById('template-sheet-path');
const selectTemplateSheetBtn = document.getElementById('select-template-sheet-btn') as HTMLButtonElement;

const saveSharedDataCheckbox = document.getElementById('save-shared-data-checkbox') as HTMLInputElement;
const sharedSheetPathEl = document.getElementById('shared-sheet-path');
const selectSharedSheetBtn = document.getElementById('select-shared-sheet-btn') as HTMLButtonElement;

const saveSeparatedDataCheckbox = document.getElementById('save-separated-data-checkbox') as HTMLInputElement;
const separatedSheetsDirPathEl = document.getElementById('separated-sheets-dir-path');
const selectSeparatedSheetsDirBtn = document.getElementById('select-separated-sheets-dir-btn') as HTMLButtonElement;

const saveRawDataCheckbox = document.getElementById('save-raw-data-checkbox') as HTMLInputElement;
const rawDataDirPathEl = document.getElementById('raw-data-dir-path');
const selectRawDataDirBtn = document.getElementById('select-raw-data-dir-btn') as HTMLButtonElement;

const notifyCheckbox = document.getElementById('notify-checkbox') as HTMLInputElement;
const autorunCheckbox = document.getElementById('autorun-checkbox') as HTMLInputElement;
const powerSaveBlokCheckbox = document.getElementById('power-save-block-checkbox') as HTMLInputElement;
const fullAppQuitCheckbox = document.getElementById('full-app-quit-checkbox') as HTMLInputElement;

const loggingCheckbox = document.getElementById('logging-checkbox') as HTMLInputElement;

const resetSettingsBtn = document.getElementById('reset-settings-btn') as HTMLButtonElement;


export function setSettingsInitialValues() {
  window.settingsAPI.get('data.fetchingUrl').then((v) => (dataFetchingUrlInput.value = v.toString()));

  window.settingsAPI.get('data.templateSheetPath').then((v) => (templateSheetPathEl.innerText = v?.toString() || 'Не выбрано'));
  window.settingsAPI.get('data.saveSharedSheet').then((v) => (saveSharedDataCheckbox.checked = !!v));
  window.settingsAPI.get('data.sharedSheetPath').then((v) => (sharedSheetPathEl.innerText = v?.toString() || 'Не выбрано'));
  window.settingsAPI.get('data.saveSeparatedSheets').then((v) => (saveSeparatedDataCheckbox.checked = !!v));
  window.settingsAPI.get('data.separatedSheetsDirPath').then((v) => (separatedSheetsDirPathEl.innerText = v?.toString() || 'Не выбрано'));
  window.settingsAPI.get('data.saveRawData').then((v) => (saveRawDataCheckbox.checked = !!v));
  window.settingsAPI.get('data.rawDataDirPath').then((v) => (rawDataDirPathEl.innerText = v?.toString() || 'Не выбрано'));

  window.settingsAPI.get('settings.notificationsEnabled').then((v) => (notifyCheckbox.checked = !!v));
  window.settingsAPI.get('settings.autorunEnabled').then((v) => (autorunCheckbox.checked = !!v));
  window.settingsAPI.get('settings.powerSaveBlockerEnabled').then((v) => (powerSaveBlokCheckbox.checked = !!v));
  window.settingsAPI.get('settings.fullAppQuitEnabled').then((v) => (fullAppQuitCheckbox.checked = !!v));
  window.settingsAPI.get('logging.loggingEnabled').then((v) => (loggingCheckbox.checked = !!v));
}

export function setSettingsHandlers() {
  dataFetchingUrlInput.onchange = updateSettingByEventCreator('data.fetchingUrl');

  selectTemplateSheetBtn.onclick = handleSelectSheetBtnClickCreator(async (filePath) => {
    templateSheetPathEl.innerText = filePath;
    await window.settingsAPI.set('data.templateSheetPath', filePath)
  });
  saveSharedDataCheckbox.onchange = updateSettingByEventCreator('data.saveSharedSheet', true);
  selectSharedSheetBtn.onclick = handleSelectSheetBtnClickCreator(async (filePath) => {
    sharedSheetPathEl.innerText = filePath;
    await window.settingsAPI.set('data.sharedSheetPath', filePath)
  });
  saveSeparatedDataCheckbox.onchange = updateSettingByEventCreator('data.saveSeparatedSheets', true);
  selectSeparatedSheetsDirBtn.onclick = handleSelectDirBtnClickCreator(async (dirPath) => {
    separatedSheetsDirPathEl.innerText = dirPath;
    await window.settingsAPI.set('data.separatedSheetsDirPath', dirPath)
  });
  saveRawDataCheckbox.onchange = updateSettingByEventCreator('data.saveRawData', true);
  selectRawDataDirBtn.onclick = handleSelectDirBtnClickCreator(async (dirPath) => {
    rawDataDirPathEl.innerText = dirPath;
    await window.settingsAPI.set('data.rawDataDirPath', dirPath)
  });

  notifyCheckbox.onchange = updateSettingByEventCreator('settings.notificationsEnabled', true);
  autorunCheckbox.onchange = updateSettingByEventCreator('settings.autorunEnabled', true);
  powerSaveBlokCheckbox.onchange = updateSettingByEventCreator('settings.powerSaveBlockerEnabled', true);
  fullAppQuitCheckbox.onchange = updateSettingByEventCreator('settings.fullAppQuitEnabled', true);
  loggingCheckbox.onchange = updateSettingByEventCreator('logging.enabled', true);

  resetSettingsBtn.onclick = handleResetSettingsBtnClick;
}

export function clearSettingsHandlers() {
  dataFetchingUrlInput.onchange = undefined;

  selectTemplateSheetBtn.onclick = undefined;
  saveSharedDataCheckbox.onchange = undefined;
  selectSharedSheetBtn.onclick = undefined;
  saveSeparatedDataCheckbox.onchange = undefined;
  selectSeparatedSheetsDirBtn.onclick = undefined;
  saveRawDataCheckbox.onchange = undefined;
  selectRawDataDirBtn.onclick = undefined;

  notifyCheckbox.onchange = undefined;
  autorunCheckbox.onchange = undefined;
  powerSaveBlokCheckbox.onchange = undefined;
  fullAppQuitCheckbox.onchange = undefined;
  loggingCheckbox.onchange = undefined;

  resetSettingsBtn.onclick = undefined;
}


function handleSelectSheetBtnClickCreator(callback: (filePath: string) => void) {
  return async () => {
    const filePath = await window.dialogAPI.getFilePath({
      filters: [
        { name: 'Sheets', extensions: ['xlsx', 'xls'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile'],
    });

    if (filePath) callback(filePath);
  }
}

function handleSelectDirBtnClickCreator(callback: (dirPath: string) => void) {
  return async () => {
    const dirPath = await window.dialogAPI.getFilePath({
      properties: ['openDirectory'],
    });

    if (dirPath) callback(dirPath);
  }
}

async function handleResetSettingsBtnClick() {
  const options: MessageBoxOptions = {
    message: 'Вы уверенны, что хотите сбросить настройки?',
    type: 'question',
    buttons: ['Да', 'Нет'],
    defaultId: 1,
    title: 'Сброс настроек',
    cancelId: 1,
  };

  const clickedBtn = await window.dialogAPI.showMessageBoxSync(options)
  if (clickedBtn === 0) {
    await window.settingsAPI.reset();
    setPlanningInitialValues();
    setSettingsInitialValues();
  }

}