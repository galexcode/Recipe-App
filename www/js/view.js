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
		ingredients: [],
		instructions: [],
		notes: [],
		tags: [],
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
	console.log("recipe saved:");
	console.log(recipe);
	saveRecipe(recipe);
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
	$('.editButton').click(function(){
		displayEditableRecipe(name);
		$.mobile.changePage( "#editRecipe", {      
			transition: "fade",    
		});
	});
}

function displayEditableRecipe(name) {
	var recipe = retrieveRecipe(name);
	$('.newName').val(recipe.name);
	$('.newYield').val(recipe.yield);
	$('.newActiveTime').val(recipe.activeTime);
	$('.newTotalTime').val(recipe.totalTime);
	$('.newCategory').val(recipe.category);
	$('.newIngredients').val(recipe.ingredients.join('\n'));
	$('.newInstructions').val(recipe.instructions.join('\n'));
	$('.newNotes').val(recipe.notes);
	$('.newTags').val(recipe.tags.join(','));
}

function displayRecipeGrid() {
	var recipeArray = retrieveRecipeList();
	var ul = $('<ul></ul>').appendTo('.recipeGrid');
	$(recipeArray).each(function(index, name) {
		var li = $('<li></li>');
		li.appendTo(ul);
		var a = $('<a href="#cookbook"></a>').text(name);
		a.appendTo(li);
		a.click(function(){
			displayRecipe(name);
		});
		//console.log("made a for "+name);
	});
}



















