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
    const nameStartIndex = $(cells[1]).text().indexOf('Ш');
    const counterData: CounterData = {
      name: $(cells[1]).text().substring(nameStartIndex),
      t: ((+$(cells[8]).text()) + (+$(cells[9]).text()) + (+$(cells[10]).text()) + (+$(cells[11]).text())) / 120,
      i1: $(cells[5]).text(),
      i2: $(cells[6]).text(),
      i3: $(cells[7]).text(),
      u1: $(cells[2]).text(),
      u2: $(cells[3]).text(),
      u3: $(cells[4]).text(),
    };
    result.push(counterData);
  }
  return result;
}