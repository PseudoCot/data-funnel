import './css/normalize.css';
import './css/index.css';
import { setPlanningInitialValues } from './renderer/planning';
import { setSettingsInitialValues } from './renderer/settings';
import { selectTabContent, setTabBtnsHandlers } from './renderer/tabs';


setPlanningInitialValues();
setSettingsInitialValues();
selectTabContent('planning');
setTabBtnsHandlers();

