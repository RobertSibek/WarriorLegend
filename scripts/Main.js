/* Main.js - Main script file */

var debugOn = true;
var p1;
var p2;

window.onload = function () {
	createCanvas();
	canvas = document.getElementById(CANVAS_NAME);
	ctx = canvas.getContext('2d');
	loadImages();
} // window.onload()

function debugLog(text) {
	if (debugOn) {
		console.log(text);
	}
}

function loadingDoneSoStartGame() {
	setInterval(mainGameLoop, 1000 / framesPerSecond);
	p1 = new carClass();
	p2 = new carClass();	
	p2.carInit(carPic2, "Green Car");
	p1.carInit(carPic1, "Blue Car");
	initInput();
}

// Main game loop
function mainGameLoop() {
	moveEverything();
	drawEverything();
} // game()

// Rendering
function drawEverything() {
	drawTracks();
	p1.carDraw();
	p2.carDraw();
} // drawEverything()

// Updating objects
function moveEverything() {
	p1.carMove();
	p2.carMove();
} // moveEverything()
