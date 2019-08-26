/* Main.js - Main script file */

var debugOn = true;
var p1;

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
	p1 = new warriorClass();
	p1.init(playerPic, "Blue Car");
	initInput();
}

// Main game loop
function mainGameLoop() {
	moveEverything();
	drawEverything();
} // game()

// Rendering
function drawEverything() {
	drawRoom();
	p1.draw();
} // drawEverything()

// Updating objects
function moveEverything() {
	p1.move();
} // moveEverything()
