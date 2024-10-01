// в параметрах callback нужен для получения html
export function fetchHtmlByWebview(url: string, cb: (html: string) => void) {
    const webviewContainer = document.getElementById('webview-container');

    if (webviewContainer.hasChildNodes()) return;

    const webview = createHiddenWebview(webviewContainer);
    webview.setAttribute('src', url);

    let loaded = false;
    webview.addEventListener('did-finish-load', () => {
        if (loaded) return;

        loaded = true;
        webview.executeJavaScript('document.documentElement.outerHTML;0', false)
            .then((html) => cb(`Ok!~<div class="box">
    <div class="box-body" id="id_body">
        <div class="table-responsive name-counter">
            <table id="example2" class="table table-bordered table-hover">
                <thead>
                    <tr class="table_th">
                        <th style="width: 2em;">#</th>
                        <th style="min-width: 17em; width: 22em;">Описание</th>
                        <th>U1(В)</th>
                        <th>U2(В)</th>
                        <th>U3(В)</th>
                        <th>I1(A)</th>
                        <th>I2(A)</th>
                        <th>I3(A)</th>
                        <th>Т1(кВтч)</th>
                        <th>Т2(кВтч)</th>
                        <th>Т3(кВтч)</th>
                        <th>Т4(кВтч)</th>
                        <th style="min-width: 12em;">Время опроса</th>
                    </tr>
                </thead>
                <tbody id="tab_name">
                    <tr>
                        <td><input class="chk" type="checkbox" value="47086489" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"47086489",2);ref();sleep(200);dataCounter("47086489",2)' style="font-family: Courier New;">Меркурий-236, #47086489</a></b><br />
                            Шкаф №1
                        </td>
                        <td>228.15</td>
                        <td>227.46</td>
                        <td>226.07</td>
                        <td>61.20</td>
                        <td>61.44</td>
                        <td>76.44</td>
                        <td>372330.480</td>
                        <td>24411.840</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-08-24 16:21]</code></td>
                    </tr>
                    <tr>
                        <td><input class="chk" type="checkbox" value="49008179" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"49008179",2);ref();sleep(200);dataCounter("49008179",2)' style="font-family: Courier New;">Меркурий-236, #49008179</a></b><br />
                            Шкаф №2
                        </td>
                        <td>236.90</td>
                        <td>236.94</td>
                        <td>237.87</td>
                        <td>368.16</td>
                        <td>362.64</td>
                        <td>363.12</td>
                        <td>1151592.960</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-09-11 16:47]</code></td>
                    </tr>
                    
<tr>
                        <td><input class="chk" type="checkbox" value="47086489" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"47086489",2);ref();sleep(200);dataCounter("47086489",2)' style="font-family: Courier New;">Меркурий-236, #47086489</a></b><br />
                            Шкаф №4
                        </td>
                        <td>228.15</td>
                        <td>227.46</td>
                        <td>226.07</td>
                        <td>61.20</td>
                        <td>61.44</td>
                        <td>76.44</td>
                        <td>372330.480</td>
                        <td>24411.840</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-08-24 16:21]</code></td>
                    </tr>
                    <tr>
                        <td><input class="chk" type="checkbox" value="49008179" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"49008179",2);ref();sleep(200);dataCounter("49008179",2)' style="font-family: Courier New;">Меркурий-236, #49008179</a></b><br />
                            Шкаф №5
                        </td>
                        <td>236.90</td>
                        <td>236.94</td>
                        <td>237.87</td>
                        <td>368.16</td>
                        <td>362.64</td>
                        <td>363.12</td>
                        <td>1151592.960</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-09-11 16:47]</code></td>
                    </tr>
                    <tr>
                        <td><input class="chk" type="checkbox" value="49008086" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"49008086",2);ref();sleep(200);dataCounter("49008086",2)' style="font-family: Courier New;">Меркурий-236, #49008086</a></b><br />
                            Шкаф №6
                        </td>
                        <td>237.78</td>
                        <td>238.10</td>
                        <td>238.89</td>
                        <td>0.00</td>
                        <td>12.00</td>
                        <td>12.00</td>
                        <td>120407.280</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-09-11 16:46]</code></td>
                    </tr>
<tr>
                        <td><input class="chk" type="checkbox" value="47086489" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"47086489",2);ref();sleep(200);dataCounter("47086489",2)' style="font-family: Courier New;">Меркурий-236, #47086489</a></b><br />
                            Шкаф №7
                        </td>
                        <td>228.15</td>
                        <td>227.46</td>
                        <td>226.07</td>
                        <td>61.20</td>
                        <td>61.44</td>
                        <td>76.44</td>
                        <td>372330.480</td>
                        <td>24411.840</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-08-24 16:21]</code></td>
                    </tr>
                    <tr>
                        <td><input class="chk" type="checkbox" value="49008179" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"49008179",2);ref();sleep(200);dataCounter("49008179",2)' style="font-family: Courier New;">Меркурий-236, #49008179</a></b><br />
                            Шкаф №8
                        </td>
                        <td>236.90</td>
                        <td>236.94</td>
                        <td>237.87</td>
                        <td>368.16</td>
                        <td>362.64</td>
                        <td>363.12</td>
                        <td>1151592.960</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-09-11 16:47]</code></td>
                    </tr>
                    <tr>
                        <td><input class="chk" type="checkbox" value="49008086" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"49008086",2);ref();sleep(200);dataCounter("49008086",2)' style="font-family: Courier New;">Меркурий-236, #49008086</a></b><br />
                            Шкаф №9
                        </td>
                        <td>237.78</td>
                        <td>238.10</td>
                        <td>238.89</td>
                        <td>0.00</td>
                        <td>12.00</td>
                        <td>12.00</td>
                        <td>120407.280</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-09-11 16:46]</code></td>
                    </tr>
<tr>
                        <td><input class="chk" type="checkbox" value="47086489" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"47086489",2);ref();sleep(200);dataCounter("47086489",2)' style="font-family: Courier New;">Меркурий-236, #47086489</a></b><br />
                            Шкаф №10
                        </td>
                        <td>228.15</td>
                        <td>227.46</td>
                        <td>226.07</td>
                        <td>61.20</td>
                        <td>61.44</td>
                        <td>76.44</td>
                        <td>372330.480</td>
                        <td>24411.840</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-08-24 16:21]</code></td>
                    </tr>
                    
                    <tr>
                        <td><input class="chk" type="checkbox" value="49008086" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"49008086",2);ref();sleep(200);dataCounter("49008086",2)' style="font-family: Courier New;">Меркурий-236, #49008086</a></b><br />
                            Шкаф №12
                        </td>
                        <td>237.78</td>
                        <td>238.10</td>
                        <td>238.89</td>
                        <td>0.00</td>
                        <td>12.00</td>
                        <td>12.00</td>
                        <td>120407.280</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-09-11 16:46]</code></td>
                    </tr>
<tr>
                        <td><input class="chk" type="checkbox" value="47086489" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"47086489",2);ref();sleep(200);dataCounter("47086489",2)' style="font-family: Courier New;">Меркурий-236, #47086489</a></b><br />
                            Шкаф №13
                        </td>
                        <td>228.15</td>
                        <td>227.46</td>
                        <td>226.07</td>
                        <td>61.20</td>
                        <td>61.44</td>
                        <td>76.44</td>
                        <td>372330.480</td>
                        <td>24411.840</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-08-24 16:21]</code></td>
                    </tr>
                    
                    <tr>
                        <td><input class="chk" type="checkbox" value="49008086" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"49008086",2);ref();sleep(200);dataCounter("49008086",2)' style="font-family: Courier New;">Меркурий-236, #49008086</a></b><br />
                            Шкаф №15
                        </td>
                        <td>237.78</td>
                        <td>238.10</td>
                        <td>238.89</td>
                        <td>0.00</td>
                        <td>12.00</td>
                        <td>12.00</td>
                        <td>120407.280</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-09-11 16:46]</code></td>
                    </tr>
                    <tr>
                        <td><input class="chk" type="checkbox" value="49008086" /></td>
                        <td>
                            <b><a onclick='selectPage(2,"49008086",2);ref();sleep(200);dataCounter("49008086",2)' style="font-family: Courier New;">Меркурий-236, #49008086</a></b><br />
                            Шкаф №16
                        </td>
                        <td>237.78</td>
                        <td>238.10</td>
                        <td>238.89</td>
                        <td>0.00</td>
                        <td>12.00</td>
                        <td>12.00</td>
                        <td>120407.280</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td>0.000</td>
                        <td><code>[2024-09-11 16:46]</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="wysihtml5-toolbar">
            <div class="btn-group">
                <a class="btn btn-default" id="btnP" title="Мощность" onclick="selectBtn(1)">P</a><a class="btn btn-default wysihtml5-command-active" id="btnU" title="Напряжение" onclick="selectBtn(2)">U</a>
                <a class="btn btn-default wysihtml5-command-active" id="btnI" title="Ток" onclick="selectBtn(3)">I</a><a class="btn btn-default wysihtml5-command-active" id="btnE" title="Энергия" onclick="selectBtn(4)">E</a>
            </div>
        </div>
    </div>
</div>
~я~undefined~~94:83:c4:2a:59:31
~~checked~skumatov2014@mail.ru~~1~checked~~~~~`))
            .finally(() => removeWebview(webviewContainer, webview));
    });
}


function createHiddenWebview(container: HTMLElement) {
    const webview = document.createElement('webview');
    webview.className = 'visually-hidden';
    container.appendChild(webview);
    return webview;
}

function removeWebview(container: HTMLElement, webview: HTMLElement) {
    container.removeChild(webview);
}
