import { dialog, OpenDialogOptions } from "electron";

export async function handleFileOpen(options: OpenDialogOptions) {
  const { canceled, filePaths } = await dialog.showOpenDialog(options);
  if (!canceled) {
    return filePaths[0];
  }
}