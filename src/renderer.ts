import './css/normalize.css';
import './css/index.css';
import { setPlanningInitialValues } from './renderer/planning';
import { setSettingsInitialValues } from './renderer/settings';
import { selectTabContent, setTabBtnsHandlers } from './renderer/tabs';
import { fetchHtmlByWebview } from './renderer-utils/fetch-html-by-webview';


const processInfoEl = document.getElementById('process-info');
const processInfoState = document.getElementById('process-info-state');
const processInfoResultDate = document.getElementById('process-info-result-date');
const processInfoFileResultsTitle = document.getElementById('process-info-file-results-title');
const processInfoFileResults = document.getElementById('process-info-file-results');
const openSharedSheetBtn = document.getElementById('open-shared-sheet-btn') as HTMLButtonElement;
const openSeparatedSheetBtn = document.getElementById('open-separated-sheet-btn') as HTMLButtonElement;
const openTsvFileBtn = document.getElementById('open-tsv-file-btn') as HTMLButtonElement;


setPlanningInitialValues();
setSettingsInitialValues();
selectTabContent('planning');
setTabBtnsHandlers();


window.collectionAPI.onConsoleLog((message) => console.log(message));

window.collectionAPI.onFetchHtml(async (url) => {
  processInfoEl.classList.remove('visually-hidden');
  processInfoState.innerText = '⏳ Идёт сбор ⏳';
  processInfoResultDate.innerHTML = getFormattedDate();
  processInfoFileResultsTitle.classList.add('visually-hidden');
  processInfoFileResults.classList.add('visually-hidden');
  openTsvFileBtn.classList.add('visually-hidden');
  openSeparatedSheetBtn.classList.add('visually-hidden');
  openSharedSheetBtn.classList.add('visually-hidden');
  openTsvFileBtn.onclick = undefined;
  openSeparatedSheetBtn.onclick = undefined;
  openSharedSheetBtn.onclick = undefined;

  fetchHtmlByWebview(url, (html) =>
    window.collectionAPI.processHtml(html)
      .then((newFilePaths) => {
        if (newFilePaths.length < 1) return;
        processInfoState.innerText = 'Cбор завершён!';
        processInfoFileResultsTitle.classList.remove('visually-hidden');
        processInfoFileResults.classList.remove('visually-hidden');
        newFilePaths.forEach((filePath) => {
          const fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
          if (fileName.endsWith('.tsv')) {
            openTsvFileBtn.onclick = () => window.dialogAPI.openFile(filePath);
            openTsvFileBtn.innerText = fileName;
            openTsvFileBtn.classList.remove('visually-hidden');
          } else if (fileName.includes(', ')) {
            openSeparatedSheetBtn.onclick = () => window.dialogAPI.openFile(filePath);
            openSeparatedSheetBtn.innerText = fileName;
            openSeparatedSheetBtn.classList.remove('visually-hidden');
          } else {
            openSharedSheetBtn.onclick = () => window.dialogAPI.openFile(filePath);
            openSharedSheetBtn.innerText = fileName;
            openSharedSheetBtn.classList.remove('visually-hidden');
          }
        })
      })
  );
});


function getFormattedDate() {
  const now = new Date;
  return `${String(now.getDate()).padStart(2, '0')}/${(String(now.getMonth() + 1)).padStart(2, '0')}/${now.getFullYear()}
  ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}