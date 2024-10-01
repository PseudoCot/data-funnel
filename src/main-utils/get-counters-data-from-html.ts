import * as cheerio from 'cheerio';
import { CounterData } from '../types/types';

// 0 skip , 1 name , 2-4 U , 5-7 I , 8-11 T , 12 time
export async function getCountersDataFromHtml(html: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const $ = cheerio.load(html, { decodeEntities: false }, false);

  const result: CounterData[] = [];
  const rows = $('tr');
  for (const row of rows) {
    if ($(row).hasClass('table_th')) continue;

    const cells = $(row).find('td');
    const counterData = createCounterDataFromRow($, cells);
    result.push(counterData);
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function createCounterDataFromRow($: cheerio.CheerioAPI, cells: cheerio.Cheerio): CounterData {
  const nameStartIndex = $(cells[1]).text().indexOf('Ш');
  const t = ((+$(cells[8]).text()) + (+$(cells[9]).text()) + (+$(cells[10]).text()) + (+$(cells[11]).text())) / 120;
  return {
    name: $(cells[1]).text().substring(nameStartIndex),
    t: changeDelimiterToComma(t.toFixed(2)),
    i1: changeDelimiterToComma($(cells[5]).text()),
    i2: changeDelimiterToComma($(cells[6]).text()),
    i3: changeDelimiterToComma($(cells[7]).text()),
    u1: changeDelimiterToComma($(cells[2]).text()),
    u2: changeDelimiterToComma($(cells[3]).text()),
    u3: changeDelimiterToComma($(cells[4]).text()),
  };
}

const changeDelimiterToComma = (value: string | number) => value.toString().replace('.', ',');