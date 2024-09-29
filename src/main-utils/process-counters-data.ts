import { getCountersDataFromHtml } from './get-counters-data-from-html';
import { prepareCountersDataForTsvFile } from './prepare-counters-data-for-tsv-file';
import { writeCountersDataToTsvFile } from './write-counters-data-to-tsv-file';

// export function collectCountersData(url: string) {
//   new Promise((resolve) => fetchHtmlByWebview(url, (html) => resolve(html)))
//     .then((html: string) => getCountersDataFromHtml(html))
//     .then((data) => prepareCountersDataForTsvFile(data))
//     .then((tsvData) => writeCountersDataToTsvFile(tsvData));
// }

export function processCountersData(html: string) {
  /// добавить прогресс, оповещение
  return getCountersDataFromHtml(html)
    .then((data) => prepareCountersDataForTsvFile(data))
    .then((tsvData) => writeCountersDataToTsvFile(tsvData)); /// обработать настройку
}