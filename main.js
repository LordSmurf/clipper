// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, clipboard, Menu } = require("electron");
const path = require("path");

let tray = null;

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 400,
		height: 600,
		frame: false,
		center: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	});

	const contextMenu = Menu.buildFromTemplate([
		{ label: "exit", type: "normal", role: "quit" },
	]);

	mainWindow.hide();
	tray = new Tray("./icon/files.png");
	tray.setToolTip("Jules's Clipboard History App");
	tray.setContextMenu(contextMenu);
	// and load the index.html of the app.
	mainWindow.loadFile("index.html");

	tray.on("click", () => {
		mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
	});

	mainWindow.on("show", () => {
		mainWindow.setAlwaysOnTop(true, "pop-up-menu");
	});

	mainWindow.on("hide", () => {
		mainWindow.setAlwaysOnTop(false);
	});

	// Open the DevTools.
	//mainWindow.webContents.openDevTools();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
<<<<<<< HEAD
	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
=======
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
>>>>>>> 7f1b2bc2906a672084af9b930ccb2f333593b55c

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("quit", () => {
	tray.destroy();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
