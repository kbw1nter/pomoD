const{ app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Pomod",
        width: 400,
        height: 430,
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'), //conectar no app react
        protocol: 'file:',
        slashes: true,
    });

    mainWindow.loadURL(startUrl); //carregar o app react na janela do electron
}

app.whenReady().then(createMainWindow);