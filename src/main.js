import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/switch/switch.js';
import '@material/web/dialog/dialog.js';
import '@material/web/button/text-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-tonal-button.js';
import '@material/web/list/list-item.js';
import '@material/web/divider/divider.js';
import '@material/web/progress/linear-progress.js';
import {styles as typescaleStyles} from '@material/web/typography/md-typescale-styles.js';

import {initTheme} from './modules/theme.js';
import {initProjects} from './modules/projects.js';
import {initNavigation, initSmoothScroll, removePreload,} from './modules/ui.js';

document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    typescaleStyles.styleSheet,
];

window.addEventListener('load', () => {
    removePreload();
    initTheme();
    initSmoothScroll();
    initNavigation();
    initProjects('/repo.json');
});

const openSettings = document.getElementById('open-settings');
const settingsDialog = document.getElementById('settings-dialog');

if (openSettings && settingsDialog) {
    openSettings.addEventListener('click', () => settingsDialog.show());
}
