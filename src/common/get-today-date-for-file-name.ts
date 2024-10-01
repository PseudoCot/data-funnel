export function getTodayDateForFileName(fileExt: string, dirPath?: string) {
  const dateTime = new Date().toLocaleString();
  return `${dirPath}${dirPath ? '\\' : ''}${dateTime.replaceAll('/', '-').replaceAll(':', '-')}.${fileExt}`;
}