import { CronJob } from "cron/dist/job";
import { DaysCheck } from "../types/types";

const daysToNumbers: { [key: string]: number } = { mo: 1, tu: 2, we: 3, th: 4, fr: 5, sa: 6, su: 7 };

let job: CronJob;

export function planJob(tzOffset: number, time: string, days: DaysCheck,
  onTick: () => void, onComplete?: () => void) {
  forgetJob();

  const [hours, minutes] = time.split(':');
  const daysNumbers = Object.entries(days)
    .filter(([, value]) => value)
    .map(([day]) => daysToNumbers[day]);

  return job = new CronJob(
    `${minutes} ${hours} * * ${daysNumbers.join(',')}`,
    onTick,
    onComplete,
    true,
    `UTC+${tzOffset}`
  );
}

export function forgetJob() {
  if (job) {
    job.stop();
    job = undefined;
  }
}
