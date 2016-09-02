// For mesuring loading performences
console.time('init');

const electron = require('electron');
// Module to control application life.
const {app} = electron;
app.setAppUserModelId("Quick Dir");
// Module to create native browser window.
const {BrowserWindow} = electron;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;



// Ensure that only one instance of Quick Dir is running.
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
        if (win.isMinimized()){
            win.restore();
        }
        win.focus();
    }
});

// Quit this instance if already one instance is running
if (shouldQuit) {
    app.quit();
}

function createWindow() {
    app.setAppUserModelId('com.electron.QuickDir');
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 400,
        x: 0,
        y: 0,
        transparent: true,
        frame: false,
        toolbar: false,
        useContentSize: true,
        maximizable: false,
        minimizable: false
    });

    // win.setMenu(null);

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/../ui/index.html`);

    // Open the DevTools.
    //win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
