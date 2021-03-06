/** APP **/

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};

// app.initialize();
   
   
   




/** SETUP **/

   
$(document).ready(function(){
	refreshRecipeGrid();
	setupNavigationBar();
	setupCreateRecipe();
	setupTabs();
});

function setupTabs() {
	$(document).on('pagebeforechange', function(event) {
		$(".navigationItem").removeClass("navigationLinkActive");
	});
	$("#grid").on('pagebeforeshow pageinit pageshow', function(event) {
		$(".navigationItem").removeClass("navigationLinkActive");
		$(".navigationGrid").addClass("navigationLinkActive");
	});
	//hack to make the grid one show
	setTimeout(function() {
		$(".navigationGrid").addClass("navigationLinkActive");
	}, 200);
	$("#createRecipe").on('pagebeforeshow', function(event) {
		$(".navigationItem").removeClass("navigationLinkActive");
		$(".navigationCreateRecipe").addClass("navigationLinkActive");
	});	
	$("#settings").on('pagebeforeshow', function(event) {
		$(".navigationItem").removeClass("navigationLinkActive");
		$(".navigationSettings").addClass("navigationLinkActive");
	});	
}








/** CAMERA **/

// function camera(){
// 	var settings = {
// 		quality: 100,
// 		destinationType: Camera.DestinationType.DATA_URL,
// 		sourceType: Camera.PictureSourceType.CAMERA,
// 		saveToPhotoAlbum: true,
// 	};
// 	navigator.camera.getPicture(cameraSuccess, cameraFailure, settings);
// }


/** 
 * from http://stackoverflow.com/questions/9180731/phonegap-retrieve-photo-from-camera-roll-via-path 
 * code modified by RJ Marsan 
 **/
function camera(nameOfRecipe, callbackWhenAllDone, source) {
	var settings = { 
		quality: 25, 
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: source,
		targetWidth: 2048,
		//allowEdit : true,
	};
	navigator.camera.getPicture(onPhotoURISuccess, fail, settings);
	function onPhotoURISuccess(imageURI) {
		window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
				fileSys.root.getDirectory("photos", {create: true, exclusive: false}, function(dir) { 
						fileEntry.copyTo(dir, makeid(nameOfRecipe)+".jpg", onCopySuccess, fail); 
					}, fail); 
			}, fail); 
		}, fail);    
	}	
	function onCopySuccess(entry) {
		console.log("Photo Success: "+entry.fullPath);
		//WE NEED TO DO SOMETHING WITH THIS RIGHT HERE.
		callbackWhenAllDone(entry.fullPath);
	}
	function fail(error) {
		console.log("Photo Error: "+error.code);
	}	
}

/** 
 * from http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
 **/
function makeid(prefix) {
    var text = prefix+"";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// function cameraSuccess(imageData){
// 	console.log("saved photo");
// 	document.getElementById('image').src = "data:image/jpeg;base64," + imageData;  //  id might need to be changed to class 'newCoverPhoto'
// }
// 
// function cameraFailure(){
// 	alert("Error");
// }








/** ACTIONS **/

function actionSaveRecipe(parentDiv, oldRecipe) {
	var recipe = createOrEditRecipe(parentDiv);
	if (recipe.name.trim() == '') {
		alert("Your recipe needs a name!");
	} else {
		if (oldRecipe) {
			deleteRecipe(oldRecipe);
		} else {
			//if we don't have an old recipe, that means we are making a new one. so we can clear the existing one.
			clearRecipeContents();
		}
		saveRecipe(recipe);
		refreshRecipeGrid();
		actionDisplaySingleRecipe(recipe.name);
	}
}

function actionDisplaySingleRecipe(name) {
	var recipe = retrieveRecipe(name);
	var recipeArray = retrieveRecipeListSortedByName();
	var index = 0;
	for (var i=0; i<recipeArray.length; i++) {
	    if (recipeArray[i].name == recipe.name) {
		index = i;
	    }
	}
	displayRecipeGallery(recipeArray, index);
	$.mobile.changePage( "#cookbook", {      
		transition: "fade",    
	});
}

function actionDisplayMultipleRecipes(recipes, index) {
	displayRecipeGallery(recipes, index);
	$.mobile.changePage( "#cookbook", {      
		transition: "fade",    
	});
}


function actionEditRecipe(recipe) {
	displayEditableRecipe(recipe);
	$.mobile.changePage( "#editRecipe", {      
		transition: "fade",    
	});
}

function actionDeleteRecipe(parentDiv, oldRecipe) {
	deleteRecipe(oldRecipe);
	refreshRecipeGrid();
	$.mobile.changePage( "#grid", {      
		transition: "fade",    
	});
}

function refreshRecipeGrid() {
	var recipeArray = retrieveRecipeList();
	displayRecipeGrid(recipeArray);
}

function actionSortRecipesByName() {
	var recipeArray = retrieveRecipeListSortedByName();
	displayRecipeGrid(recipeArray);
}

/**
 * code contributed by RJ Marsan
 **/
function actionTakeCoverPhoto(recipe, callbackWhenAllDone) {
	camera(recipe.name, callbackWhenAllDone, Camera.PictureSourceType.CAMERA);
}

/**
 * code contributed by RJ Marsan
 **/
function actionPickCoverPhoto(recipe, callbackWhenAllDone) {
	camera(recipe.name, callbackWhenAllDone, Camera.PictureSourceType.PHOTOLIBRARY);
}
