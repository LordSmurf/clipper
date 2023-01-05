<<<<<<< HEAD
const {
	clipboard,
	Notification,
	NativeImage,
	nativeImage,
} = require("electron");
const Vue = require("vue/dist/vue.js");
const cut = new Audio("./sounds/cut.mp3");
const screenshot = new Audio("./sounds/screenshot.mp3");

const App = new Vue({
	el: "#app",
	data: {
		title: "📋Clipper",
		history: [],
		boxColour: false,
	},
	mounted() {
		this.history.push({
			text: clipboard.readText(),
			image: clipboard.readImage().toDataURL(),
			clipped: new Date().toLocaleString("en-GB", { timeZone: "GMT" }),
		});
		setInterval(this.checkClipboard, 500);
	},
	computed: {
		historyReversed() {
			return this.history.slice().reverse();
		},
	},
	methods: {
		checkClipboard() {
			const text = clipboard.readText();
			const image = clipboard.readImage();
			const newImage = image;
			let newImageURL = newImage.toDataURL();

			if (text.match(/youtube.com/g) || text.match(/youtu.be/g)) {
				let array = [...text.split("/")];
				let videoID = array[3].toString();
				if (videoID.includes("watch?v=")) {
					let actualID = videoID.split("=");
					if (
						clipboard.readImage().isEmpty() &&
						this.history[this.history.length - 1].text !== text
					) {
						this.history.push({
							text,
							image: `http://img.youtube.com/vi/${actualID[1].toString()}/0.jpg`,
							clipped: new Date().toLocaleString("en-GB", { timeZone: "GMT" }),
						});
						//this.boxColour = true;
						cut.currentTime = 0;
						cut.play();
					}
				} else {
					if (
						clipboard.readImage().isEmpty() &&
						this.history[this.history.length - 1].text !== text
					) {
						this.history.push({
							text,
							image: `http://img.youtube.com/vi/${videoID}/0.jpg`,
							clipped: new Date().toLocaleString("en-GB", { timeZone: "GMT" }),
						});
						//this.boxColour = true;
						cut.currentTime = 0;
						cut.play();
					}
				}
			}

			if (
				clipboard.readImage().isEmpty() &&
				this.history[this.history.length - 1].text !== text
			) {
				this.history.push({
					text,
					image: "",
					clipped: new Date().toLocaleString("en-GB", { timeZone: "GMT" }),
				});
				//this.boxColour = false;
				cut.currentTime = 0;
				cut.play();
			} else if (
				!clipboard.readImage().isEmpty() &&
				this.history[this.history.length - 1].image !== newImageURL
			) {
				this.history.push({
					text: "",
					image: newImageURL,
					clipped: new Date().toLocaleString("en-GB", { timeZone: "GMT" }),
				});
				//this.boxColour = false;
				screenshot.currentTime = 0;
				screenshot.play();
			}
		},
		itemClicked(item) {
			const index = this.history.indexOf(item);
			const native = nativeImage.createFromDataURL(item.image);

			if (item.text !== "") {
				this.history.splice(index, 1);
				clipboard.writeText(item.text);
				window.scrollTo(0, 0);
			} else {
				this.history.splice(index, 1);
				clipboard.writeImage(native);
				window.scrollTo(0, 0);
			}
		},
		imagePage() {
			console.log("Hello Images!");
		},
		youtubePage() {
			console.log("Hello Youtube!");
		},
		codePage() {
			console.log("Hello Code!");
		},
	},
});
=======
/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
>>>>>>> 7f1b2bc2906a672084af9b930ccb2f333593b55c
