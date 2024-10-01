export function getTodayDateForFileName(dirPath?: string) {
  const dateTime = new Date().toLocaleString();
  return `${dirPath}${dirPath ? '/' : ''}${dateTime.replaceAll('/', '-').replaceAll(':', '-')}.tsv`;
}