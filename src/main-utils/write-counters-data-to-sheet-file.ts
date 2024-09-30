import settings from 'electron-settings';
import ExcelJS from 'exceljs';
import { CounterData } from "../types/types";


export async function writeCountersDataToSheetFile(data: CounterData[]) {
  const sheetFilePath = settings.getSync('data.sheetFilePath').toString();
  // const newSheetFilePath = 

  const workbook = new ExcelJS.Workbook();
  workbook.calcProperties.fullCalcOnLoad = true;
  await workbook.xlsx.readFile(sheetFilePath);

  // await workbook.xlsx.writeFile(newSheetFilePath);

  return;
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
