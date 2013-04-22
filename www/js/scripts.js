/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 



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




// $.mobile.changePage( "target-page.html", {      
// 	transition: "slide", 
// 	reverse: false, 
// 	changeHash: false,
// 	reloadPage: true      
// });
   
   
   
   
$(document).ready(function(){
	displayRecipeGrid();
});




function camera(){
	var settings = {
		quality: 100,
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType: Camera.PictureSourceType.CAMERA,
		saveToPhotoAlbum: true,
	};
	navigator.camera.getPicture(cameraSuccess, cameraFailure, settings);
}

function cameraSuccess(imageData){
	console.log("saved photo");
	document.getElementById('image').src = "data:image/jpeg;base64," + imageData;
}

function cameraFailure(){
	alert("Error");
}




function createAndSaveRecipe() {
	var recipe = {
		name: "",
		yield: "",
		activeTime: "",
		totalTime: "",
		category: "",
		ingredients: [],
		instructions: [],
		notes: [],
		tags: [],
	};
	recipe.name = $('#recipeName').val();
	recipe.yield = $('#recipeYield').val();
	recipe.activeTime = $('#recipeActiveTime').val();
	recipe.totalTime = $('#recipeTotalTime').val();
	recipe.category = $('#recipeCategories').val();
	recipe.ingredients = parseIngredients();
	recipe.instructions = parseInstructions();
	recipe.notes = $('#recipeNotes').val();
	recipe.tags = parseTags();
	console.log("recipe saved:");
	console.log(recipe);
	window.localStorage.setItem(recipe.name, JSON.stringify(recipe));
}

function retrieveRecipe(name) {
	var retrievedRecipe = JSON.parse(window.localStorage.getItem(name));
	console.log("recipe retrieved:");
	console.log(retrievedRecipe);
	return retrievedRecipe;
}

function parseIngredients() {
	var ingredientsString = $('#recipeIngredients').val();
	var ingredientsArray = ingredientsString.split('\n').filter(Boolean);  //  \n = new line  // http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
	return ingredientsArray;	
}

function parseInstructions() {
	var instructionsString = $('#recipeInstructions').val();
	var instructionsArray = instructionsString.split('\n').filter(Boolean);  //  \n = new line // http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
	return instructionsArray;	
}

function parseTags() {
	var tagsString = $('#recipeTags').val();
	var tagsArray = tagsString.split(',').filter(Boolean);
	return tagsArray;	
}

function displayRecipe(name) {
	var recipe = retrieveRecipe(name);
	$('.displayName').html(recipe.name);
	$('.displayYield').html(recipe.yield);
	$('.displayActiveTime').html(recipe.activeTime);
	$('.displayTotalTime').html(recipe.totalTime);
	$('.displayCategory').html(recipe.category);
	$('.listIngredients').html('');  // first pass an empty string to clear the html
	var ul = $('<ul></ul>').appendTo('.listIngredients');
	$(recipe.ingredients).each(function(index, item) {
		var li = $('<li></li>').text(item);
		li.appendTo(ul);
	});
	$('.listInstructions').html('');  // first pass an empty string to clear the html
	var ul = $('<ol></ol>').appendTo('.listInstructions');
	$(recipe.instructions).each(function(index, item) {
		var li = $('<li></li>').text(item);
		li.appendTo(ul);
	});
	$('.displayNotes').html(recipe.notes);
	$('.listTags').html('');  // first pass an empty string to clear the html
	var ul = $('<ul></ul>').appendTo('.listTags');
	$(recipe.tags).each(function(index, item) {
		var li = $('<li></li>').text(item);
		li.appendTo(ul);
	});
}

function displayEditableRecipe() {
	var recipe = retrieveRecipe();
	$('#recipeName').val(recipe.name);
	$('#recipeYield').val(recipe.yield);
	$('#recipeActiveTime').val(recipe.activeTime);
	$('#recipeTotalTime').val(recipe.totalTime);
	$('#recipeCategory').val(recipe.category);
	$('#recipeIngredients').val(recipe.ingredients.join('\n'));
	$('#recipeInstructions').val(recipe.instructions.join('\n'));
	$('#recipeNotes').val(recipe.notes);
	$('#recipeTags').val(recipe.tags.join(','));
}

function retrieveRecipeList() {
	var recipeArray = [];
	for (var i = 0; i < window.localStorage.length; i++) {
		recipeArray.push(window.localStorage.key(i));
	}
	return recipeArray;
}

function displayRecipeGrid() {
	var recipeArray = retrieveRecipeList();
	var ul = $('<ul></ul>').appendTo('.recipeGrid');
	$(recipeArray).each(function(index, name) {
		var li = $('<li></li>');
		li.appendTo(ul);
		var a = $('<a href="#"></a>').text(name);
		a.appendTo(li);
		a.click(function(){
			displayRecipe(name);
		});
		//console.log("made a for "+name);
	});
}



















