/* ImageLoading.js - handling loading images */

var playerPic = document.createElement('img');
var picsLoaded = 0;
var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
	picsLoaded++;
	debugLog(picsLoaded + '/' + picsToLoad + ' images loaded');
	if (picsLoaded == picsToLoad) {
		loadingDoneSoStartGame();
	}
}

function loadImages() {
	var imageList = [
		{ varName: playerPic, theFile: "warrior.png" },
		
		{ tileType: TILE_GROUND, theFile: "world_ground.png" },
		{ tileType: TILE_WALL, theFile: "world_wall.png" },
		{ tileType: TILE_KEY, theFile: "world_key.png" },
		{ tileType: TILE_DOOR, theFile: "world_door.png" },
		{ tileType: TILE_GOAL, theFile: "world_goal.png" }
	];

	picsToLoad = imageList.length;
	for (var i = 0; i < picsToLoad; i++) {
		if (imageList[i].tileType != undefined) {
			// here we handle world images
			loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
		} else {
			// This is the player's car image
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}

function loadImageForTileCode(tileCode, fileName) {
	tilePics[tileCode] = document.createElement("img");
	beginLoadingImage(tilePics[tileCode], fileName);
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = PATH_IMG + fileName;

}
