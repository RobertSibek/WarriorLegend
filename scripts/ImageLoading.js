/* ImageLoading.js - handling loading images */

var carPic1 = document.createElement('img');
var carPic2 = document.createElement('img');
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
		{ varName: carPic1, theFile: "player1.png" },
		{ varName: carPic2, theFile: "player2.png" },
		
		{ trackType: TRACK_ROAD, theFile: "track_road.png" },
		{ trackType: TRACK_WALL, theFile: "track_wall.png" },
		{ trackType: TRACK_GOAL, theFile: "track_goal.png" },
		{ trackType: TRACK_TREE, theFile: "track_tree.png" },
		{ trackType: TRACK_FLAG, theFile: "track_flag.png" }
	];

	picsToLoad = imageList.length;
	for (var i = 0; i < picsToLoad; i++) {
		if (imageList[i].trackType != undefined) {
			// here we handle track images
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		} else {
			// This is the player's car image
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}

function loadImageForTrackCode(trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = PATH_IMG + fileName;

}
