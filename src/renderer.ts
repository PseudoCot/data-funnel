import './css/normalize.css';
import './css/index.css';
import { setPlanningInitialValues } from './renderer/planning';
import { setSettingsInitialValues } from './renderer/settings';
import { selectTabContent, setTabBtnsHandlers } from './renderer/tabs';
import { fetchHtmlByWebview } from './renderer-utils/fetch-html-by-webview';


setPlanningInitialValues();
setSettingsInitialValues();
selectTabContent('planning');
setTabBtnsHandlers();


window.collectionAPI.onFetchHtml(async (url) => {
  console.log('fetch');
  fetchHtmlByWebview(url, (html) => window.collectionAPI.processHtml(html))
});
