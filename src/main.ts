import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import settings from 'electron-settings';
import Squirrel from "electron-squirrel-startup";
import { handleFileOpen } from './renderer-utils/handle-file-open';
import { processCountersData } from './main-utils/process-counters-data';


declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

const SETTINGS_DEFAULTS = {
  initialized: true,
  collection: {
    enabled: false,
    days: { mo: true, tu: true, we: true, th: true, fr: true, sa: false, su: false },
    tzOffset: 3,
    time: '10:00',
  },
  data: {
    fetchingUrl: '',
    sharedSheetPath: '',
    templateSheetPath: '',
    separatedSheetsDirPath: '',
  },
  settings: {
    notificationsEnabled: false,
    autorunEnabled: false,
    powerSaveBlockerEnabled: false,
    fullAppQuitEnabled: true,
  },
  rawData: {
    savingEnabled: false,
    dirPath: '',
  },
  logging: {
    enabled: false,
  },
};

if (Squirrel) {
  app.quit();
}


setSettingsDefaultValues();


function setSettingsDefaultValues() {
  const initialized = settings.getSync('initialized');

  if (!initialized) {
    settings.setSync(SETTINGS_DEFAULTS);
  }
}

function setIpcHandlers() {
  ipcMain.handle('dialog:getFilePath', (_, options) => {
    return handleFileOpen(options);
  });
  ipcMain.handle('dialog:showMessageBox', (_, options) => {
    return dialog.showMessageBox(options);
  });
  ipcMain.handle('dialog:showMessageBoxSync', (_, options) => {
    return dialog.showMessageBoxSync(options);
  });

  ipcMain.handle('settings:set', (_, key, value) => {
    return settings.set(key, value);
  });
  ipcMain.handle('settings:get', (_, key) => {
    return settings.get(key);
  });
  ipcMain.handle('settings:reset', () => {
    setSettingsDefaultValues();
    return;
  });
}

function setLateIpcHandlers(mainWindow: BrowserWindow) {
  ipcMain.on('collection:collect', (_, saveRawData) => {
    const url = settings.getSync('data.fetchingUrl').toString();
    mainWindow.webContents.send('collection:fetchHtml', url);
    ipcMain.handle('collection:processHtml', (_, html) => {
      ipcMain.removeHandler('collection:processHtml');
      return processCountersData(html, saveRawData);
    });
  });
}

const createWindow = () => {
  setIpcHandlers();

  const mainWindow = new BrowserWindow({
    minWidth: 800, width: 1000, maxWidth: 1200,
    minHeight: 400, height: 600, maxHeight: 800,
    center: true,
    fullscreen: false,
    fullscreenable: false,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: 'assets/funnel.png',
    title: 'Data Funnel',
    backgroundColor: '#DBDFE3',
  });

  setLateIpcHandlers(mainWindow);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();
};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
