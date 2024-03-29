/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { download } from 'electron-dl'
import { autoUpdater } from 'electron-updater'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
	process.env.NODE_ENV === 'development'
	  ? `http://localhost:9080`
	  : `file://${__dirname}/index.html`

function createWindow () {
  /**
	 * Initial window options
	 */
  mainWindow = new BrowserWindow({
    height: 1000,
    useContentSize: true,
    width: 1000,
    show: false,
    webPreferences: {
      devTools: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.setMenu(null)

  ipcMain.on('download', (event, info) => {
    info.properties.onProgress = status =>
      mainWindow.webContents.send('download progress', status)
    download(BrowserWindow.getFocusedWindow(), info.url, info.properties).then(
      dl => mainWindow.webContents.send('download complete', dl.getSavePath())
    )
  })
}
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  createWindow()
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})

// app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('openChat', function (e, data) {
  const modalPath =
		process.env.NODE_ENV === 'development'
		  ? 'http://localhost:9080/ChatWindow.vue'
		  : `file://${__dirname}/index.html#ChatWindow`
  let win = new BrowserWindow({
    width: 400,
    height: 320,
    webPreferences: { webSecurity: false }
  })
  win.on('close', function () {
    win = null
  })
  win.loadURL(modalPath)
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
