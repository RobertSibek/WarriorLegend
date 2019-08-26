/* Warrior.js - all warrior related stuff */

const PLAYER_MOVE_SPEED = 5;

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
			nextY -= PLAYER_MOVE_SPEED;
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

		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
		var walkIntoTileType = roomGrid[walkIntoTileIndex];

		switch (walkIntoTileType) {
			case TILE_GROUND:
				// move player to next position
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_KEY:
				// add key to player's inventory, remove key from the roomGrid
				this.keysHeld++;
				roomGrid[walkIntoTileIndex] = TILE_GROUND;
				break;
			case TILE_DOOR:
				// check if there's key available and if yes move into position
				if (this.keysHeld > 0) {
					this.keysHeld--;
					roomGrid[walkIntoTileIndex] = TILE_GROUND;
				}
				break;
			case TILE_GOAL:
				// show the win message, reset room
				debugLog(this.myName + ' won the game!');
				this.reset();
				break;
			case TILE_WALL:
				// do nothing and fall back to default
			default:
				// play some dumb sound
				break;
		}
	}

	this.reset = function () {
		this.keysHeld = 0;
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
