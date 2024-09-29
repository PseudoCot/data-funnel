import settings from 'electron-settings';
import { TSVFileWriter } from "../libs/tsv-file-writer";

export async function writeCountersDataToTsvFile(tsvData: string[]) {
  const rawDataDirPath = settings.getSync('rawData.dirPath').toString();
  const dateTime = new Date().toLocaleString();
  const fileWriter = new TSVFileWriter(`${rawDataDirPath}/${dateTime.replaceAll('/', '-').replaceAll(':', '-')}.tsv`);

  await fileWriter.write(dateTime);
  await fileWriter.write('name\tu1\tu2\tu3\ti1\ti2\ti3\tt');
  for (const rowData of tsvData) {
    await fileWriter.write(rowData);
  }
}
