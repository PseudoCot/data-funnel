// const TIMEOUT_BEFORE_SAVING = 1000;

// let timeout: ReturnType<typeof setTimeout>;

// export function updateSettingByEventCreator(settingKey: string, checkbox = false) {
//   return (ev: Event) => {
//     if (timeout) return;

//     timeout = setTimeout(() => {
//       timeout = undefined;
//       const target = ev.target as HTMLInputElement;
//       window.settingsAPI.set(settingKey, checkbox ? target.checked : target.value)
//     }, TIMEOUT_BEFORE_SAVING)
//   };
// }

export function updateSettingByEventCreator(settingKey: string, checkbox = false) {
  return (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    window.settingsAPI.set(settingKey, checkbox ? target.checked : target.value)
  };
}