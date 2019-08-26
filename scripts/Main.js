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

function drawStatus() {
	ctx.fillStyle = 'yellow';
	ctx.shadowColor = 'black';
	ctx.shadowOffsetX = 2;
	ctx.shadowOffsetY = 2;
	ctx.shadowBlur = 3;
	ctx.font = '20px Arial';
	ctx.fillText('Keys: ' + p1.keysHeld, 10, 30);
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;		
	ctx.shadowBlur = 0;
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
	drawStatus();
} // drawEverything()

// Updating objects
function moveEverything() {
	p1.move();
} // moveEverything()
