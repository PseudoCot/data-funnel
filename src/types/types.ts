export type DialogProp = 'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles'
  | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory' | 'dontAddToRecent';

export type SettingsValue = null | boolean | string | number | SettingsObject | SettingsValue[];
export type SettingsObject = {
  [key: string]: SettingsValue;
};

export type Tab = 'planning' | 'process' | 'settings';