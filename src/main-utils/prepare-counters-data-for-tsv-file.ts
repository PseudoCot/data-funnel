import { CounterData } from "../types/types";

export function prepareCountersDataForTsvFile(data: CounterData[]) {
  return data.map((counterData) => Object.values(counterData)
    .map((value) => value.toString().replace('.', ','))
    .join('\t'));
}
