import { scrapHtmlByUrl } from "../utils/scrap-html-by-url";
import { updateSettingByEventCreator } from "../utils/update-setting-by-event-creator";

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
  window.settingsAPI.get('collection.enabled').then((v) => (collectionCheckbox.checked = !!v));

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
  collectionCheckbox.onchange = updateSettingByEventCreator('collection.enabled', true);

  concudtCollectionBtn.onclick = () => {
    scrapHtmlByUrl('https://github.com/PseudoCot?tab=repositories');
  };
  setPlanBtn.onclick = async () => {
    updateCollectionSettings();
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
