import * as cheerio from 'cheerio';


export function scrapHtmlByUrl(url: string) {
  fetchHtmlByWebview(url, (html) => getCountersDataFromHtml(html));
}


const webviewContainer = document.getElementById('webview-container');


function createHiddenWebview() {
  const webview = document.createElement('webview');
  webview.className = 'visually-hidden';
  webviewContainer.appendChild(webview);
  return webview;
}

function removeWebview(webview: HTMLElement) {
  webviewContainer.removeChild(webview);
}

function fetchHtmlByWebview(url: string, cb: (html: string) => void) {
  const webview = createHiddenWebview();

  webview.setAttribute('src', url);

  let loaded = false;
  webview.addEventListener('did-finish-load', function (event) {
    if (loaded) return;

    loaded = true;
    webview.executeJavaScript('document.documentElement.outerHTML', false)
      .then((html) => cb(html))
      .finally(() => removeWebview(webview));
  });
}

function getCountersDataFromHtml(html: string) {
  const $ = cheerio.load(html);

  const links = $(`a[itemprop='name codeRepository']`);
  for (const link of links) {
    console.log($(link).attr('href'));
  }

  const times = $(`relative-time.no-wrap`);
  for (const time of times) {
    console.log($(time).text());
  }
}