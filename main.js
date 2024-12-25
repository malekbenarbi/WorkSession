const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: Math.min(width, 2000),
    height: Math.min(height, 600),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, 
    },
  });

  mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`);
}

ipcMain.on('open-myFirstApp', (event, data) => {
  console.log('open-myFirstApp received with data:', data);
  mainWindow.loadURL(`file://${path.join(__dirname, '../myFirstApp/index.html')}`);
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.webContents.send('form-data', data);
  });
});

ipcMain.on('open-mySecondApp', () => {
  console.log('open-mySecondApp received');
  mainWindow.loadURL(`file://${path.join(__dirname, '../mySecondApp/index.html')}`);
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});