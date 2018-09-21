const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');

function createWindow(title) {
    const windowUrl = url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
    });
    const window = new BrowserWindow({
        title: title,
        width: 500,
        height: 300, 
        webPreferences: {
            nativeWindowOpen: true, // window.open return Window object(like in regular browsers), not BrowserWindowProxy
            affinity: 'main-window'// main window, and addition windows should work in one process
        }
    });
    window.webContents.on('new-window', function (e, url, frameName, disposition, options) {
        // at now new window in mainWindow renderer process.
        // Also, this will automatically get an option `nodeIntegration=false`(not override to true, like in iframe's) - like in regular browsers
        options.webPreferences.affinity = 'main-window';
    });
    window.loadURL(windowUrl);
    window.openDevTools();
}

app.on('ready', () => {  
    createWindow('main');
});

app.on('window-all-closed', () => {
    app.quit();
});
