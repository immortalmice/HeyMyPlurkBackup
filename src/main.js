const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  dialog
} = require('electron')
const path = require('path')

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Create BrowserWindow
function createWindow () {
  const { screen } = require('electron')

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width * 0.9,
    height: height * 0.9,
    menuBarVisible: false,
    webPreferences: {
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.removeMenu()
  registerIPC(mainWindow)

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'))
}

function registerIPC(mainWindow) {
  ipcMain.on('open_devtools', () => mainWindow.webContents.openDevTools())

  ipcMain.handle('dialog:openDirectory',
    async () => {
      const filePaths = dialog.showOpenDialogSync(mainWindow, {
        defaultPath: __dirname,
        properties: ['openDirectory']
      })
      return filePaths ? filePaths[0] : undefined
    })
}