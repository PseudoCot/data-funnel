// в параметрах callback нужен для получения html
export function fetchHtmlByWebview(url: string, cb: (html: string) => void) {
    const webviewContainer = document.getElementById('webview-container');

    if (webviewContainer.hasChildNodes()) return;

    const webview = createHiddenWebview(webviewContainer);
    webview.setAttribute('src', url);
    console.log(url);

    let loaded = false;
    webview.addEventListener('did-finish-load', () => {
        if (loaded) return;

        console.log('url loaded');

        loaded = true;
        webview.executeJavaScript('document.documentElement.outerHTML', false)
            .then((html) => {
                console.log(html);

                cb(html);
            })
            .finally(() => webviewContainer.removeChild(webview));
    });
}


function createHiddenWebview(container: HTMLElement) {
    const webview = document.createElement('webview');
    webview.className = 'visually-hidden';
    container.appendChild(webview);
    return webview;
}
