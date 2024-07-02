const { app, BrowserWindow } = require('electron');
const path = require('path');
const { PythonShell } = require('python-shell');

let mainWindow;
let pyProc = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function startPythonBackend() {
  const pythonPath = app.isPackaged
    ? path.join(process.resourcesPath, 'backend', 'venv', 'bin', 'python')
    : path.join(__dirname, 'backend', 'venv', 'bin', 'python');
  const scriptPath = app.isPackaged
    ? path.join(process.resourcesPath, 'backend', 'app', 'main.py')
    : path.join(__dirname, 'backend', 'app', 'main.py');

  pyProc = PythonShell.run(scriptPath, { pythonPath }, function (err) {
    if (err) console.error('Failed to start Python backend:', err);
  });
}

app.on('ready', () => {
  startPythonBackend();
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('quit', () => {
  if (pyProc) {
    pyProc.kill();
    pyProc = null;
  }
});