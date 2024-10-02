import settings from 'electron-settings';
import { MessageBoxOptions } from "electron";
import { fileExists } from '../common/file-exists';

export async function checkSettingsMeetRequirements(): Promise<MessageBoxOptions> {
  let failureMessage = await checkUrlEntered();
  if (failureMessage) return failureMessage;

  const saveSeparatedSheets = !!(await settings.get('data.saveSeparatedSheets'));
  const saveRawData = !!(await settings.get('data.saveRawData'));
  const saveSharedSheet = !!(await settings.get('data.saveSharedSheet'));

  failureMessage = await checkSaveMethodSelected(saveSeparatedSheets, saveRawData, saveSharedSheet);
  if (failureMessage) return failureMessage;

  const separatedSheetsDirPath = (await settings.get('data.separatedSheetsDirPath')).toString();
  const rawDataDirPath = (await settings.get('data.rawDataDirPath')).toString();
  const sharedSheetPath = (await settings.get('data.sharedSheetPath')).toString();

  failureMessage = await checkRequirementPathsSelected(
    saveSeparatedSheets, saveRawData, saveSharedSheet,
    separatedSheetsDirPath, rawDataDirPath, sharedSheetPath
  );
  if (failureMessage) return failureMessage;

  failureMessage = await checkRequirementPathsCorrect(
    saveSeparatedSheets, saveRawData, saveSharedSheet,
    separatedSheetsDirPath, rawDataDirPath, sharedSheetPath
  );
  if (failureMessage) return failureMessage;
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
  saveSharedSheet: boolean, separatedSheetsDirPath: string, rawDataDirPath: string,
  sharedSheetPath: string): Promise<void | MessageBoxOptions> {
  if (saveSeparatedSheets && !separatedSheetsDirPath) {
    return {
      title: 'Внимание!',
      message: 'Не выбрана папка для сохранения данных со счётчиков в раздельных таблицах.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы сделать выбор.',
      type: 'warning',
      buttons: ['Ок'],
      defaultId: 1,
      cancelId: 1,
    };
  } else if (saveRawData && !rawDataDirPath) {
    return {
      title: 'Внимание!',
      message: 'Не выбрана папка для дополнительного сохранения данных со счётчиков в раздельных текстовых файлах.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы сделать выбор.',
      type: 'warning',
      buttons: ['Ок'],
      defaultId: 1,
      cancelId: 1,
    };
  } else if (saveSharedSheet && !sharedSheetPath) {
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

async function checkRequirementPathsCorrect(saveSeparatedSheets: boolean, saveRawData: boolean,
  saveSharedSheet: boolean, separatedSheetsDirPath: string, rawDataDirPath: string,
  sharedSheetPath: string): Promise<void | MessageBoxOptions> {
  if (saveSeparatedSheets && !(await fileExists(separatedSheetsDirPath))) {
    return {
      title: 'Внимание!',
      message: 'Путь к папке для сохранения данных со счётчиков в раздельных таблицах некорректен.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы обновить путь.',
      type: 'warning',
      buttons: ['Ок'],
      defaultId: 1,
      cancelId: 1,
    };
  } else if (saveRawData && !(await fileExists(rawDataDirPath))) {
    return {
      title: 'Внимание!',
      message: 'Путь к папке для дополнительного сохранения данных со счётчиков в раздельных текстовых файлах некорректен.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы обновить путь.',
      type: 'warning',
      buttons: ['Ок'],
      defaultId: 1,
      cancelId: 1,
    };
  } else if (saveSharedSheet && !(await fileExists(sharedSheetPath))) {
    return {
      title: 'Внимание!',
      message: 'Путь к общей таблице для сохранения данных со счётчиков некорректен.\nПроцесс сбора не будет запущен.\nПерейдите в настройки, чтобы обновить путь.',
      type: 'warning',
      buttons: ['Ок'],
      defaultId: 1,
      cancelId: 1,
    };
  }
}
