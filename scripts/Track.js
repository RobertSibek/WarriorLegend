/* Track.js - all track/road related stuff */

const TRACK_COLOR = 'blue';
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;
const TRACK_PLAYER = 2;

var trackPics = [];

var trackGrid = //// now with 3's (GOAL), 4's (TREE), 5's (FLAG)
    [4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
      4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
      1, 1, 5, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      0, 3, 0, 0, 0, 0, 1, 4, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
      0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 1, 5, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1];

function getTrackAtPixelCoord(pixelX, pixelY) {
	var tileCol = pixelX / TRACK_W;
	var tileRow = pixelY / TRACK_H;

	// we'll use Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	// first check whether the track is within any part of the track wall
	if (tileCol < 0 || tileCol >= TRACK_COLS ||
		tileRow < 0 || tileRow >= TRACK_ROWS) {
		return TRACK_WALL; // bail out of function to avoid illegal array position usage
	}

	var trackIndex = trackTileToIndex(tileCol, tileRow);
	return (trackGrid[trackIndex]);
}

function trackTileToIndex(tileCol, tileRow) {
	return (tileCol + TRACK_COLS * tileRow);
}

function isWallAtTileCoord(trackTileCol, trackTileRow) {
	var trackIndex = trackTileCol + TRACK_COLS * trackTileRow;
	return (trackGrid[trackIndex] == TRACK_WALL);
}

function drawTracks() {
	var trackIndex = 0;
	var trackTopEdge = 0;
	var trackLeftEdge = 0;

	for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
		trackLeftEdge = 0;
		for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
			ctx.drawImage(trackPics[trackGrid[trackIndex]], trackLeftEdge, trackTopEdge);
			trackIndex++;
			trackLeftEdge += TRACK_W;
		}
		trackTopEdge += TRACK_H;
	}
}
