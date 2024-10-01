import { Tab } from "../types/types";
import { setPlanningHandlers, clearPlanningHandlers, clearPlanningSettingsHandlers, setPlanningSettingsHandlers } from "./planning";
import { clearSettingsHandlers, setSettingsHandlers } from "./settings";


let selectedTab: Tab;


export function selectTabContent(clickedTab: Tab) {
  if (clickedTab === selectedTab) return;

  const planningTabContent = document.getElementById('tab-planning-content');
  const processTabContent = document.getElementById('tab-process-content');
  const settingsTabContent = document.getElementById('tab-settings-content');

  switch (clickedTab) {
    case 'planning':
      selectedTab = 'planning';
      planningTabContent.className = 'planning';
      processTabContent.className = 'process visually-hidden';
      settingsTabContent.className = 'settings visually-hidden';
      setPlanningHandlers();
      setPlanningSettingsHandlers();
      clearSettingsHandlers();
      break;
    case 'process':
      selectedTab = 'process';
      planningTabContent.className = 'planning visually-hidden';
      processTabContent.className = 'process';
      settingsTabContent.className = 'settings visually-hidden';
      clearPlanningHandlers();
      clearPlanningSettingsHandlers();
      clearSettingsHandlers();
      break;
    case 'settings':
      selectedTab = 'settings';
      planningTabContent.className = 'planning visually-hidden';
      processTabContent.className = 'process visually-hidden';
      settingsTabContent.className = 'settings';
      clearPlanningHandlers();
      clearPlanningSettingsHandlers();
      setSettingsHandlers();
      break;
  }
}

export function setTabBtnsHandlers() {
  const planningTabBtn = document.getElementById('tab-planning-btn') as HTMLButtonElement;
  const processTabBtn = document.getElementById('tab-process-btn') as HTMLButtonElement;
  const settingsTabBtn = document.getElementById('tab-settings-btn') as HTMLButtonElement;
  planningTabBtn.onclick = () => selectTabContent('planning')
  processTabBtn.onclick = () => selectTabContent('process')
  settingsTabBtn.onclick = () => selectTabContent('settings')
}

