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
   
   
   
   
$(document).ready(function(){
	refreshRecipeGrid();
	setupNavigationBar();
});




// function camera(){
// 	var settings = {
// 		quality: 100,
// 		destinationType: Camera.DestinationType.DATA_URL,
// 		sourceType: Camera.PictureSourceType.CAMERA,
// 		saveToPhotoAlbum: true,
// 	};
// 	navigator.camera.getPicture(cameraSuccess, cameraFailure, settings);
// }


/** From http://stackoverflow.com/questions/9180731/phonegap-retrieve-photo-from-camera-roll-via-path **/
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

function makeid(prefix) { //from http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
    var text = prefix+"";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


/**********/



// function cameraSuccess(imageData){
// 	console.log("saved photo");
// 	document.getElementById('image').src = "data:image/jpeg;base64," + imageData;  //  id might need to be changed to class 'newCoverPhoto'
// }
// 
// function cameraFailure(){
// 	alert("Error");
// }




function actionSaveRecipe(parentDiv, oldRecipe) {
	var recipe = createOrEditRecipe(parentDiv);
	if (recipe.name.trim() == '') {
		alert("Your recipe needs a name!");
	} else {
		if (oldRecipe) {
			deleteRecipe(oldRecipe);
		}
		saveRecipe(recipe);
		displayRecipe(recipe);
		refreshRecipeGrid();
		$.mobile.changePage("#cookbook", {      
			transition: "fade",    
		});
	}
}

function actionDisplayRecipe(name) {
	var recipe = retrieveRecipe(name);
	displayRecipe(recipe);
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



function actionTakeCoverPhoto(recipe, callbackWhenAllDone) {
	camera(recipe.name, callbackWhenAllDone, Camera.PictureSourceType.CAMERA);
}
function actionPickCoverPhoto(recipe, callbackWhenAllDone) {
	camera(recipe.name, callbackWhenAllDone, Camera.PictureSourceType.PHOTOLIBRARY);
}
