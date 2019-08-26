/* Car.js - all car related stuff */

const TURN_RATE = 0.03;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = -0.2;
const GROUNDSPEED_DECAY_MULT = 0.94;
const MINIMUM_TURN_SPEED = 0.5;
const CAR_START_ANGLE = -0.5 * Math.PI;

function carClass() {

	this.carX;
	this.carY;

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.setupControls = function (forwardKey, backKey, leftKey, rightKey) {
		this.controlKeyForGas = forwardKey;
		this.controlKeyForReverse = backKey;
		this.controlKeyForTurnLeft = leftKey;
		this.controlKeyForTurnRight = rightKey;
	}

	this.carInit = function (whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.carReset();
	}

	this.carDraw = function () {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.carX, this.carY, this.carAng);
	}

	this.carMove = function () {
		if (this.keyHeld_Gas) {
			this.carSpeed += DRIVE_POWER;
		}
		if (this.keyHeld_Reverse) {
			this.carSpeed += REVERSE_POWER;
		}
		if (Math.abs(this.carSpeed) > MINIMUM_TURN_SPEED) {
			if (this.keyHeld_TurnRight) {
				this.carAng += TURN_RATE * Math.PI;
			}
			if (this.keyHeld_TurnLeft) {
				this.carAng += -TURN_RATE * Math.PI;
			}
		}

		var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
		var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed;
		var drivingToTileType = getTrackAtPixelCoord(nextX, nextY);

		if (drivingToTileType == TRACK_ROAD) {
			this.carX = nextX;
			this.carY = nextY;
		} else if (drivingToTileType == TRACK_GOAL) {
			debugLog(this.myName + ' won the game!');
			p1.carReset();
			p2.carReset();
		} else if (drivingToTileType == TRACK_WALL) {
			this.carSpeed *= -0.75;
		}
		this.carSpeed *= GROUNDSPEED_DECAY_MULT;
	}

	// Reset car's position
	this.carReset = function () {
		this.carSpeed = 0;
		this.carAng = CAR_START_ANGLE;
		if (this.homeX == undefined) {
			for (var i = 0; i < trackGrid.length; i++) {
				if (trackGrid[i] == TRACK_PLAYER) {
					tileRow = Math.floor(i / TRACK_COLS);
					tileCol = i % TRACK_COLS;
					this.homeX = tileCol * TRACK_W + 0.5 * TRACK_W;
					this.homeY = tileRow * TRACK_H + 0.5 * TRACK_H;
					trackGrid[i] = TRACK_ROAD;
					break;
				} // if
			} // for
		} // if
		this.carX = this.homeX;
		this.carY = this.homeY;
	} // carReset()

}
