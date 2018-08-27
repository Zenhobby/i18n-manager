import * as Sentry from '@sentry/electron';
import _ from 'lodash';
import { app } from 'electron';
import * as path from 'path';
import isDev from 'electron-is-dev';

import { setupSentry } from '../common/sentry';
import loadMenu from './menu';
import { hasWindows, createWindow } from './windowManager';
import installExtensions from './devtoolsInstaller';

setupSentry(Sentry);

app.on('ready', () => {
  loadMenu();
  createWindow();

  if (isDev) {
    const reload = require('electron-reload');
    const electronPath = path.join(__dirname, '../..', 'node_modules', '.bin', 'electron');
    reload(__dirname, { electron: electronPath });

    installExtensions();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!hasWindows()) {
    createWindow();
  }
});