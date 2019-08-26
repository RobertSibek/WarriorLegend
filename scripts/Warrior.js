/* Warrior.js - all warrior related stuff */

const PLAYER_MOVE_SPEED = 3.0;

function warriorClass() {

	this.x;
	this.y;

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_East = false;
	this.keyHeld_West = false;

	this.setupControls = function (northKey, eastKey, southKey, westKey) {
		this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
	}

	this.init = function (whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.reset();
	}

	this.draw = function () {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}

	this.move = function () {
		var nextX = this.x;
		var nextY = this.y;
		
		if (this.keyHeld_North) {
			nextY -= PLAYER_MOVE_SPEED
		}
		if (this.keyHeld_South) {
			nextY += PLAYER_MOVE_SPEED;
		}
		if (this.keyHeld_East) {
			nextX -= PLAYER_MOVE_SPEED;
		}
		if (this.keyHeld_West) {
			nextX += PLAYER_MOVE_SPEED;
		}


		var movingToTileType = getTileAtPixelCoord(nextX, nextY);

		if (movingToTileType == TILE_GROUND) {
			this.x = nextX;
			this.y = nextY;
		} else if (movingToTileType == TILE_GOAL) {
			debugLog(this.myName + ' won the game!');
			this.reset();
		}
	}

	this.reset = function () {
		this.speed = 0;
		if (this.homeX == undefined) {
			for (var i = 0; i < roomGrid.length; i++) {
				if (roomGrid[i] == TILE_PLAYER) {
					tileRow = Math.floor(i / ROOM_COLS);
					tileCol = i % ROOM_COLS;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
					roomGrid[i] = TILE_GROUND;
					break;
				} // if
			} // for
		} // if
		this.x = this.homeX;
		this.y = this.homeY;
	}

}
