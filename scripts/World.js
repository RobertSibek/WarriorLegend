/* World.js - all world related stuff */

const TILE_W = 50;
const TILE_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 12;
const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;
const TILE_PLAYER = 2;

var tilePics = [];

var roomGrid =
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1, 
      1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1, 
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1, 
      1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1, 
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1, 
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 
      1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1, 
      1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 
      1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1, 
      1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function getTileIndexAtPixelCoord(pixelX, pixelY) {
	var tileCol = pixelX / TILE_W;
	var tileRow = pixelY / TILE_H;

	// we'll use Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	// first check whether the world is within any part of the world wall
	if (tileCol < 0 || tileCol >= ROOM_COLS ||
		tileRow < 0 || tileRow >= ROOM_ROWS) {
		debugLog('Out of bounds: ' + pixelX + ',' + pixelY);
		return undefined; // bail out of function to avoid illegal array position usage
	}

	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return (tileIndex);
}

function tileHasTransparency(checkTileType) {
	return (checkTileType == TILE_DOOR ||
		   	checkTileType == TILE_KEY ||
		   	checkTileType == TILE_GOAL);
}

function roomTileToIndex(tileCol, tileRow) {
	return (tileCol + ROOM_COLS * tileRow);
}

function isWallAtTileCoord(worldTileCol, worldTileRow) {
	var worldIndex = worldTileCol + ROOM_COLS * worldTileRow;
	return (roomGrid[worldIndex] == TILE_WALL);
}

function drawRoom() {
	var tileIndex = 0;
	var tileTopEdge = 0;
	var tileLeftEdge = 0;

	for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
		tileLeftEdge = 0;
		for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
			var tileTypeHere = roomGrid[tileIndex];
			if (tileHasTransparency(tileTypeHere)) {
				ctx.drawImage(tilePics[TILE_GROUND], tileLeftEdge, tileTopEdge, TILE_W, TILE_H);
			}
			ctx.drawImage(tilePics[tileTypeHere], tileLeftEdge, tileTopEdge, TILE_W, TILE_H);
			tileIndex++;
			tileLeftEdge += TILE_W;
		}
		tileTopEdge += TILE_H;
	}
}
