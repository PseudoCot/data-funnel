import settings from 'electron-settings';
import ExcelJS from 'exceljs';
import { CounterData } from "../types/types";


export async function writeCountersDataToSharedSheet(data: CounterData[]) {
  const templateFilePath = settings.getSync('data.templateSheetPath').toString();
  const sharedSheetFilePath = settings.getSync('data.sharedSheetPath').toString();

  // await copyFile('source.txt', 'destination.txt', constants.COPYFILE_FICLONE); /// поменять мод?

  const workbook = new ExcelJS.Workbook();
  workbook.calcProperties.fullCalcOnLoad = true;
  await workbook.xlsx.readFile(sharedSheetFilePath);

  await workbook.xlsx.writeFile(sharedSheetFilePath);

  return sharedSheetFilePath;
}