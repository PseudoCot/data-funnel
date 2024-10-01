import settings from 'electron-settings';
import ExcelJS, { Worksheet } from 'exceljs';
import path from 'path';
import { CounterData } from "../types/types";
import { getTodayDateForFileName } from '../common/get-today-date-for-file-name';
import { DateTime } from 'luxon';
import { compareObjectsByKeyCreator } from '../common/compare-objects-by-key-creator';
import {
  COUNTERS_IN_TRANSF, TRANSF_DIFF, TRANSF_DATE_CELL_COL, TRANSF_DATE_CELL_ROW, COUNTER_START_ROW,
  COUNTER_T_COL, COUNTER_I_START_COL, COUNTER_U_START_COL, MONTHS,
} from '../consts';

export async function writeCountersDataToSeparatedSheet(data: CounterData[]) {
  // const templateFilePath = (await settings.get('data.templateSheetPath')).toString();
  const separatedSheetsDirPath = (await settings.get('data.separatedSheetsDirPath')).toString();
  const newSheetFilePath = getTodayDateForFileName('xlsx', separatedSheetsDirPath);

  // await copyFile('source.txt', 'destination.txt', constants.COPYFILE_FICLONE);

  const workbook = new ExcelJS.Workbook();
  workbook.calcProperties.fullCalcOnLoad = true;
  await workbook.xlsx.readFile(path.resolve(__dirname, 'template.xlsx'));
  const worksheet = workbook.getWorksheet('Template');

  await writeCountersDataToTemplate(worksheet, data);

  await workbook.xlsx.writeFile(newSheetFilePath);

  return newSheetFilePath;
}

async function writeCountersDataToTemplate(worksheet: Worksheet, data: CounterData[]) {
  const date = await getFormattedTodayDate();
  data.sort(compareObjectsByKeyCreator('name'));

  let transf;
  let transfStep;
  let inTransfDiff;
  for (let i = 0; i < data.length; i++) {
    const counter = data[i];
    const counterIndex = +(counter.name.substring(counter.name.indexOf('№') + 1));
    const nextTransf = Math.ceil(counterIndex / COUNTERS_IN_TRANSF);
    if (transf !== nextTransf) {
      transf = nextTransf;
      transfStep = (transf - 1) * TRANSF_DIFF;
      worksheet.getCell(`${TRANSF_DATE_CELL_COL}${TRANSF_DATE_CELL_ROW + transfStep}`).value = date;
    }
    inTransfDiff = (counterIndex - 1) % COUNTERS_IN_TRANSF;

    const counterRow = worksheet.getRow(COUNTER_START_ROW + transfStep + inTransfDiff);
    counterRow.getCell(COUNTER_T_COL).value = counter.t;
    counterRow.getCell(COUNTER_I_START_COL).value = counter.i1;
    counterRow.getCell(COUNTER_I_START_COL + 1).value = counter.i2;
    counterRow.getCell(COUNTER_I_START_COL + 2).value = counter.i3;
    counterRow.getCell(COUNTER_U_START_COL).value = counter.u1;
    counterRow.getCell(COUNTER_U_START_COL + 1).value = counter.u2;
    counterRow.getCell(COUNTER_U_START_COL + 2).value = counter.u3;
  }
}

async function getFormattedTodayDate() {
  const tzOffset = +(await settings.get('collection.tzOffset'));
  const today = DateTime.local({ zone: `UTC+${tzOffset}` });
  return `${today.day} ${MONTHS[today.month - 1]} ${today.year} г.`;
}

// function createNewWorkbook() {
//   const workbook = new ExcelJS.Workbook();
//   workbook.calcProperties.fullCalcOnLoad = true;

//   workbook.views = [
//     {
//       x: 0, y: 0, width: 1000, height: 10000,
//       firstSheet: 0, activeTab: 1, visibility: 'veryHidden'
//     }
//   ];

//   const sheet = workbook.addWorksheet('Транфсорматор 1', { views: [{ state: 'frozen', ySplit: 2 }] });

//   sheet.columns = [ // #f4b084 #404040 #bdd7ee #c6e0b4
//     { header: 'Наименование', key: 'name', width: 37, },
//     { header: 'Коэфaициент Трансформации', key: 'coef', width: 18 },
//     { header: 'ПОКАЗАНИЯ', key: 'data', width: 17 },
//     { header: 'Количество КВТ/Ч', key: 'count', width: 16 },
//     { header: 'Разница п показаний', key: 'diff', width: 19 },
//     { header: 'A1', key: 'i1', width: 10 },
//     { header: 'A2', key: 'i2', width: 10 },
//     { header: 'A3', key: 'i3', width: 10 },
//     { header: 'V1', key: 'u1', width: 8 },
//     { header: 'V2', key: 'u2', width: 8 },
//     { header: 'V3', key: 'u3', width: 8 },
//     { header: 'W1 (кВт)', key: 'w1', width: 12 },
//     { header: 'W2 (кВт)', key: 'w2', width: 12 },
//     { header: 'W3 (кВт)', key: 'w3', width: 12 },
//     { header: 'W-ШКАФ', key: 'w-safe', width: 12 },
//     { header: 'W-ТРАНС', key: 'w-trans', width: 14 },
//   ];
// }

// async function writeCountersDataToTemplate(worksheet: Worksheet, data: CounterData[]) {
//   const date = await getFormattedTodayDate();
//   data.sort(compareObjectsByKeyCreator('name'));

//   let transf;
//   let transfStep;
//   let inTransfDiff;
//   for (let i = 0; i < data.length; i++) {
//     const counter = data[i];
//     const counterIndex = +(counter.name.substring(counter.name.indexOf('№') + 1));
//     const nextTransf = Math.ceil(counterIndex / COUNTERS_IN_TRANSF);
//     if (transf !== nextTransf) {
//       transf = nextTransf;
//       transfStep = (transf - 1) * TRANSF_DIFF;
//       worksheet.getCell(`${TRANSF_DATE_CELL_COL}${TRANSF_DATE_CELL_ROW + transfStep}`).value = date;
//       worksheet.getCell(`${TRANSF_NAME_CELL_COL}${TRANSF_NAME_CELL_ROW + transfStep}`).value = `Трансформатор №${transf} (2500/5)`;
//     }
//     inTransfDiff = (counterIndex % COUNTERS_IN_TRANSF) - 1;

//     const counterRow = worksheet.getRow(COUNTER_START_ROW + transfStep + inTransfDiff);
//     counterRow.getCell(COUNTER_NAME_COL).value = counter.name;
//     counterRow.getCell(COUNTER_T_COL).value = counter.t;
//     counterRow.getCell(COUNTER_I_START_COL).value = counter.i1;
//     counterRow.getCell(COUNTER_I_START_COL + 1).value = counter.i2;
//     counterRow.getCell(COUNTER_I_START_COL + 2).value = counter.i3;
//     counterRow.getCell(COUNTER_U_START_COL).value = counter.u1;
//     counterRow.getCell(COUNTER_U_START_COL + 1).value = counter.u2;
//     counterRow.getCell(COUNTER_U_START_COL + 2).value = counter.u3;
//   }
// }