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
  u1: string,
  u2: string,
  u3: string,
  i1: string,
  i2: string,
  i3: string,
  t: number,
}

export type ProgressType = 'none' | 'normal' | 'indeterminate' | 'error' | 'paused'