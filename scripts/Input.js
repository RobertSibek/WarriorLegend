/* Input.js - All input and control related stuff */

const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

const KEY_LETTER_W = 87;
const KEY_LETTER_S = 83;
const KEY_LETTER_A = 65;
const KEY_LETTER_D = 68;

function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);	
	p1.setupControls(KEY_UP_ARROW, KEY_LEFT_ARROW, KEY_DOWN_ARROW, KEY_RIGHT_ARROW);
}

function keyPressed(evt) {
//	console.log(evt.keyCode);
	setKeyHoldState(evt.keyCode, p1, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, p1, false);
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
	switch (thisKey) {
		case thisPlayer.controlKeyForNorth:
			thisPlayer.keyHeld_North = setTo;
			break;
		case thisPlayer.controlKeyForEast:
			thisPlayer.keyHeld_East = setTo;
			break;			
		case thisPlayer.controlKeyForSouth:
			thisPlayer.keyHeld_South = setTo;
			break;
		case thisPlayer.controlKeyForWest:
			thisPlayer.keyHeld_West = setTo;
			break;

		default:
			break;
	}
}