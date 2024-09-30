import { DateTime } from 'luxon';

let timeInterval: ReturnType<typeof setInterval>;

const untilNextCollectionText = document.getElementById('until-next-collection-text');

export async function startCountdownUntilDatetime(nextDate: DateTime) {
  stopCountdown();
  const tzOffset = +(await window.settingsAPI.get('collection.tzOffset'));
  updateCountdown(nextDate, tzOffset);
  timeInterval = setInterval(() => updateCountdown(nextDate, tzOffset), 1000);
}

function updateCountdown(nextDate: DateTime, tzOffset: number) {
  const now = DateTime.local({ zone: `UTC+${tzOffset}` });

  const diffTime = nextDate.diff(now, ['hours', 'minutes', 'seconds']);

  if (diffTime.as('milliseconds') <= 0) {
    stopCountdown();
    return;
  }

  untilNextCollectionText.innerText = `${diffTime.hours}:${diffTime.minutes}:${Number(diffTime.seconds)}`;
}

export function stopCountdown() {
  clearInterval(timeInterval);
  untilNextCollectionText.innerText = "00:00:00";
}
