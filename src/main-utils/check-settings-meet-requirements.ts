import settings from 'electron-settings';
import { MessageBoxOptions } from "electron";

export async function checkSettingsMeetRequirements(): Promise<MessageBoxOptions> {
  let checkMessage = await checkUrlEntered();
  if (checkMessage) return checkMessage;

  const saveSeparatedSheets = !!(await settings.get('data.saveSeparatedSheets'));
  const saveRawData = !!(await settings.get('data.saveRawData'));
  const saveSharedSheet = !!(await settings.get('data.saveSharedSheet'));

  checkMessage = await checkSaveMethodSelected(saveSeparatedSheets, saveRawData, saveSharedSheet);
  if (checkMessage) return checkMessage;

  checkMessage = await checkRequirementPathsSelected(saveSeparatedSheets, saveRawData, saveSharedSheet);
  if (checkMessage) return checkMessage;
}

async function checkUrlEntered(): Promise<void | MessageBoxOptions> {
  if (await settings.get('data.fetchingUrl')) {
    return;
  }

  return {
    title: 'Внимание!',
    message: 'Не выбрана ссылка для запроса данных со счётчиков.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы добавить ссылку.',
    type: 'warning',
    buttons: ['Ок'],
    defaultId: 1,
    cancelId: 1,
  };
}

async function checkSaveMethodSelected(saveSeparatedSheets: boolean, saveRawData: boolean,
  saveSharedSheet: boolean): Promise<void | MessageBoxOptions> {
  if (saveSeparatedSheets || saveRawData || saveSharedSheet) {
    return;
  }

  return {
    title: 'Внимание!',
    message: 'Не выбран ни один способ сохранения данных со счётчиков.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы сделать выбор.',
    type: 'warning',
    buttons: ['Ок'],
    defaultId: 1,
    cancelId: 1,
  };
}

async function checkRequirementPathsSelected(saveSeparatedSheets: boolean, saveRawData: boolean,
  saveSharedSheet: boolean): Promise<void | MessageBoxOptions> {
  if (saveSeparatedSheets && !(await settings.get('data.separatedSheetsDirPath'))) {
    return {
      title: 'Внимание!',
      message: 'Не выбрана папка для сохранения данных со счётчиков в раздельных таблицах.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы сделать выбор.',
      type: 'warning',
      buttons: ['Ок'],
      defaultId: 1,
      cancelId: 1,
    };
  } else if (saveRawData && !(await settings.get('data.rawDataDirPath'))) {
    return {
      title: 'Внимание!',
      message: 'Не выбрана папка для дополнительного сохранения данных со счётчиков в раздельных текстовых файлах.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы сделать выбор.',
      type: 'warning',
      buttons: ['Ок'],
      defaultId: 1,
      cancelId: 1,
    };
  } else if (saveSharedSheet && !(await settings.get('data.sharedSheetPath'))) {
    return {
      title: 'Внимание!',
      message: 'Не выбрана общая таблица для сохранения данных со счётчиков.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы сделать выбор.',
      type: 'warning',
      buttons: ['Ок'],
      defaultId: 1,
      cancelId: 1,
    };
  }
}
