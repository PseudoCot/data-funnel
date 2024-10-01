import settings from 'electron-settings';
import { TSVFileWriter } from "../libs/tsv-file-writer";
import { getTodayDateForFileName } from '../common/get-today-date-for-file-name';

export async function writeCountersDataToTsvFile(tsvData: string[]) {
  const rawDataDirPath = settings.getSync('data.rawDataDirPath').toString();
  const fileName = getTodayDateForFileName('tsv', rawDataDirPath);
  const fileWriter = new TSVFileWriter(fileName);

  await fileWriter.write(new Date().toLocaleString());
  await fileWriter.write('name\tt\ti1\ti2\ti3\tu1\tu2\tu3');
  for (const rowData of tsvData) {
    await fileWriter.write(rowData);
  }
}
