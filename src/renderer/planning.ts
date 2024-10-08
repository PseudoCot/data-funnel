import { CronJob } from "cron";
import { updateSettingByEventCreator } from "../renderer-utils/update-setting-by-event-creator";
import { startCountdownUntilDatetime, stopCountdown } from "../renderer-utils/start-countdown-until-datetime";
import { DaysCheck } from "../types/types";
import { forgetJob, planJob } from "../main-utils/plan-job";
import { TIME_TO_COLLECT_DATA } from "../consts";

let job: CronJob;
let isCollectingData = false;
let isChangingCollectionSettings = false;

const collectionCheckbox = document.getElementById('enable-collection-checkbox') as HTMLInputElement;
const concudtCollectionBtn = document.getElementById('concudt-collection-btn') as HTMLButtonElement;

const mondayCheckbox = document.getElementById('mo-day-checkbox') as HTMLInputElement;
const tuesdayCheckbox = document.getElementById('tu-day-checkbox') as HTMLInputElement;
const wensdayCheckbox = document.getElementById('we-day-checkbox') as HTMLInputElement;
const thursdayCheckbox = document.getElementById('th-day-checkbox') as HTMLInputElement;
const fridayCheckbox = document.getElementById('fr-day-checkbox') as HTMLInputElement;
const saturdayCheckbox = document.getElementById('sa-day-checkbox') as HTMLInputElement;
const sundayCheckbox = document.getElementById('su-day-checkbox') as HTMLInputElement;

const tzSelect = document.getElementById('tz-select') as HTMLInputElement;
const timeInput = document.getElementById('time-input') as HTMLInputElement;

const setPlanBtn = document.getElementById('set-plan-btn') as HTMLButtonElement;
const cancelPlanBtn = document.getElementById('cancel-plan-btn') as HTMLButtonElement;


export function setPlanningInitialValues() {
  window.settingsAPI.get('collection.enabled').then((v) => {
    collectionCheckbox.checked = !!v;
    handleCollectionSettingsChange();
  });

  window.settingsAPI.get('collection.days.mo').then((v) => (mondayCheckbox.checked = !!v));
  window.settingsAPI.get('collection.days.tu').then((v) => (tuesdayCheckbox.checked = !!v));
  window.settingsAPI.get('collection.days.we').then((v) => (wensdayCheckbox.checked = !!v));
  window.settingsAPI.get('collection.days.th').then((v) => (thursdayCheckbox.checked = !!v));
  window.settingsAPI.get('collection.days.fr').then((v) => (fridayCheckbox.checked = !!v));
  window.settingsAPI.get('collection.days.sa').then((v) => (saturdayCheckbox.checked = !!v));
  window.settingsAPI.get('collection.days.su').then((v) => (sundayCheckbox.checked = !!v));

  window.settingsAPI.get('collection.tzOffset').then((v) => (tzSelect.value = v.toString()));
  window.settingsAPI.get('collection.time').then((v) => (timeInput.value = v.toString()));
}

export function setPlanningHandlers() {
  const collectionCheckboxHandler = updateSettingByEventCreator('collection.enabled', true);
  collectionCheckbox.onchange = (ev) => {
    collectionCheckboxHandler(ev);
    if ((ev.target as HTMLInputElement).checked) {
      handleJobPlanning();
    } else {
      handleJobForgetting();
    }
  };

  concudtCollectionBtn.onclick = handleConductCollectionBtnClick;

  setPlanBtn.onclick = async () => {
    updateCollectionSettings();
    handleCollectionSettingsChange();
    isChangingCollectionSettings = false;
    cancelPlanBtn.disabled = true;
  };
  cancelPlanBtn.onclick = async () => {
    setPlanningInitialValues();
  };
}

export function clearPlanningHandlers() {
  collectionCheckbox.onchange = undefined;
  concudtCollectionBtn.onclick = undefined;
  setPlanBtn.onclick = undefined;
  cancelPlanBtn.onclick = undefined;
}

export function setPlanningSettingsHandlers() {
  mondayCheckbox.onchange = handleCollectionSettingChange;
  tuesdayCheckbox.onchange = handleCollectionSettingChange;
  wensdayCheckbox.onchange = handleCollectionSettingChange;
  thursdayCheckbox.onchange = handleCollectionSettingChange;
  fridayCheckbox.onchange = handleCollectionSettingChange;
  saturdayCheckbox.onchange = handleCollectionSettingChange;
  sundayCheckbox.onchange = handleCollectionSettingChange;
  tzSelect.onchange = handleCollectionSettingChange;
  timeInput.onchange = handleCollectionSettingChange;
}

export function clearPlanningSettingsHandlers() {
  mondayCheckbox.onchange = undefined;
  tuesdayCheckbox.onchange = undefined;
  wensdayCheckbox.onchange = undefined;
  thursdayCheckbox.onchange = undefined;
  fridayCheckbox.onchange = undefined;
  saturdayCheckbox.onchange = undefined;
  sundayCheckbox.onchange = undefined;
  tzSelect.onchange = undefined;
  timeInput.onchange = undefined;
}

function handleCollectionSettingChange() {
  if (isChangingCollectionSettings) return

  isChangingCollectionSettings = true;
  cancelPlanBtn.disabled = false;
}

export async function updateCollectionSettings() {
  // обновление с помощью объекта не работает
  await window.settingsAPI.set('collection.days.mo', mondayCheckbox.checked)
  await window.settingsAPI.set('collection.days.tu', tuesdayCheckbox.checked)
  await window.settingsAPI.set('collection.days.we', wensdayCheckbox.checked)
  await window.settingsAPI.set('collection.days.th', thursdayCheckbox.checked)
  await window.settingsAPI.set('collection.days.fr', fridayCheckbox.checked)
  await window.settingsAPI.set('collection.days.sa', saturdayCheckbox.checked)
  await window.settingsAPI.set('collection.days.su', sundayCheckbox.checked)
  await window.settingsAPI.set('collection.tzOffset', +tzSelect.value)
  await window.settingsAPI.set('collection.time', timeInput.value)
}

export function handleCollectionSettingsChange() {
  if (collectionCheckbox.checked) {
    handleJobPlanning(true);
  }
}

async function handleJobPlanning(settingsChanged = false) {
  let tzOffset: number, time: string, days: DaysCheck
  if (settingsChanged) {
    tzOffset = +tzSelect.value;
    time = timeInput.value;
    days = {
      mo: mondayCheckbox.checked,
      tu: tuesdayCheckbox.checked,
      we: wensdayCheckbox.checked,
      th: thursdayCheckbox.checked,
      fr: fridayCheckbox.checked,
      sa: saturdayCheckbox.checked,
      su: sundayCheckbox.checked,
    };
  } else {
    tzOffset = +(await window.settingsAPI.get('collection.tzOffset'));
    time = (await window.settingsAPI.get('collection.time')).toString();
    days = (await window.settingsAPI.get('collection.days')) as DaysCheck;
  }
  job = planJob(tzOffset, time, days, handleJobActivating);
  startCountdownUntilDatetime(job.nextDate());
}

function handleJobActivating() {
  handleConductCollectionBtnClick();
  startCountdownUntilDatetime(job.nextDate());
}

function handleJobForgetting() {
  forgetJob();
  job = undefined;
  stopCountdown();
}

function handleConductCollectionBtnClick() {
  if (isCollectingData) return;

  isCollectingData = true;
  concudtCollectionBtn.disabled = true;

  window.collectionAPI.collectCountersData(false);
  setTimeout(() => {
    isCollectingData = false;
    concudtCollectionBtn.disabled = false;
  }, TIME_TO_COLLECT_DATA);
}