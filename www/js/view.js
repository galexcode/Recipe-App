function setupNavigationBar() {
	$(".iconNav").click(function () {
      $(this).toggleClass("rotated");
      $(".navigationLinks").toggleClass("navigationLinksCollapsed");
      $(".navigationLinksBackground").toggleClass("navigationLinksBackgroundCollapsed");
//       $(".navigationLinks").fadeToggle();
//       $(".navigationLinksBackground").fadeToggle();
    });
}

function clearRecipeContents() {
	$('#createRecipe textarea').html('');  // first pass an empty string to clear the html
}

function createOrEditRecipe(parentDiv) {
	var recipe = {
		name: "",
		yield: "",
		activeTime: "",
		totalTime: "",
		category: "",
		date: 0,
		ingredients: [],
		instructions: [],
		notes: [],
		tags: [],
		coverphoto: "",
		photos: [],
	};
	recipe.name = $(parentDiv + ' .newName').val();
	recipe.yield = $(parentDiv + ' .newYield').val();
	recipe.activeTime = $(parentDiv + ' .newActiveTime').val();
	recipe.totalTime = $(parentDiv + ' .newTotalTime').val();
	recipe.category = $(parentDiv + ' .newCategory').val();
	recipe.ingredients = parseIngredients(parentDiv);
	recipe.instructions = parseInstructions(parentDiv);
	recipe.notes = $(parentDiv + ' .newNotes').val();
	recipe.tags = parseTags(parentDiv);
	recipe.coverphoto = parseCoverPhoto(parentDiv);
	console.log("recipe saved:");
	console.log(recipe);
	return recipe;
}

function parseIngredients(parentDiv) {
	var ingredientsString = $(parentDiv + ' .newIngredients').val();
	var ingredientsArray = ingredientsString.split('\n').filter(Boolean);  //  \n = new line  // http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
	return ingredientsArray;	
}

function parseInstructions(parentDiv) {
	var instructionsString = $(parentDiv + ' .newInstructions').val();
	var instructionsArray = instructionsString.split('\n').filter(Boolean);  //  \n = new line // http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
	return instructionsArray;	
}

function parseTags(parentDiv) {
	var tagsString = $(parentDiv + ' .newTags').val();
	var tagsArray = tagsString.split(',').filter(Boolean);
	return tagsArray;	
}

function parseCoverPhoto(parentDiv) {
	return $(parentDiv+" .addCoverPhoto").css("background-image");
}

function displayRecipe(recipe) {
	$('.recipeCover').css("background-image",recipe.coverphoto);
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
	$('.editButton').unbind('click').click(function(){  //  .unbind('click') removes any previous click events attached
		actionEditRecipe(recipe);
	});
}

function displayEditableRecipe(recipe) {
	$('#editRecipe .newName').val(recipe.name);
	$('#editRecipe .newYield').val(recipe.yield);
	$('#editRecipe .newActiveTime').val(recipe.activeTime);
	$('#editRecipe .newTotalTime').val(recipe.totalTime);
	$('#editRecipe .newCategory').val(recipe.category);
	$('#editRecipe .newIngredients').val(recipe.ingredients.join('\n'));
	$('#editRecipe .newInstructions').val(recipe.instructions.join('\n'));
	$('#editRecipe .newNotes').val(recipe.notes);
	$('#editRecipe .newTags').val(recipe.tags.join(','));
	$("#editRecipe .addCoverPhoto").css("background-image", recipe.coverphoto);

	$('#editRecipe .saveButton').unbind('click').click(function(){
		actionSaveRecipe('#editRecipe', recipe);
	});
	$('#editRecipe .deleteButton').unbind('click').click(function(){
		actionDeleteRecipe('#editRecipe', recipe);
	});
	$('#editRecipe .addCoverPhoto').unbind('click').click(function(){
		showCoverPhotoPicker(recipe);
	});
}

function showCoverPhotoPicker(recipe) {
	$(".bigPopupBackground").fadeIn().unbind('click').click(function() {
		$(this).fadeOut();
	});
	$(".bigPopupBackground .optionOne").unbind('click').click(function() {
		actionTakeCoverPhoto(recipe, function(imagePath) {
			$(".bigPopupBackground").fadeOut();
			console.log("Photo was a success. setting as background image");
			$("#editRecipe .addCoverPhoto").css("background-image", "url("+imagePath+")");
		});
		//return false;
	});
	$(".bigPopupBackground .optionTwo").unbind('click').click(function() {
		actionPickCoverPhoto(recipe, function(imagePath) {
			$(".bigPopupBackground").fadeOut();
			console.log("Photo was a success. setting as background image");
			$("#editRecipe .addCoverPhoto").css("background-image", "url("+imagePath+")");
		});
		//return false;
	});
}

function displayRecipeGrid(recipeArray) {
	$('.recipeGrid').html('');  // first pass an empty string to clear the html
	var ul = $('<ul></ul>').appendTo('.recipeGrid');
	$(recipeArray).each(function(index, recipe) {
		var li = $('<li></li>');
		li.appendTo(ul);
		var a = $('<a href="#"></a>').text(recipe.name);
		a.css("background-image", recipe.coverphoto);
		a.appendTo(li);
		a.unbind('click').click(function(){  //  .unbind('click') removes any previous click events attached
			actionDisplayRecipe(recipe.name);
		});
		//console.log("made a for "+name);
	});
}