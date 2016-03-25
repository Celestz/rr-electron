// Module to control application life.
var electron = require('electron')
var app = electron.app

// Module to create native browser window.
var BrowserWindow = require('browser-window')
var mainWindow = null

//Auto Reload for Development
require('electron-reload')(__dirname, {
  electron: require('electron-prebuilt')
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

  // Create the browser window.
  var electronScreen = electron.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;
  var mainWindow = new BrowserWindow({ 
    width: size.width * 0.80, 
    height: size.height * 0.80,
    webPreferences: { webSecurity: false }
  })

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/src/index.html')

  // Open the devtools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

});