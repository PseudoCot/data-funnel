export type SettingsValue = null | boolean | string | number | SettingsObject | SettingsValue[];
export type SettingsObject = {
  [key: string]: SettingsValue;
};

export type Tab = 'planning' | 'process' | 'settings';

export type DaysCheck = {
  mo: boolean,
  tu: boolean,
  we: boolean,
  th: boolean,
  fr: boolean,
  sa: boolean,
  su: boolean,
}

export type CounterData = {
  name: string,
  u1: number,
  u2: number,
  u3: number,
  i1: number,
  i2: number,
  i3: number,
  t: number,
}

export type ProgressType = 'none' | 'normal' | 'indeterminate' | 'error' | 'paused'