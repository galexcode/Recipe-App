function saveRecipe(recipe) {
	window.localStorage.setItem(recipe.name, JSON.stringify(recipe));
}

function retrieveRecipe(name) {
	var retrievedRecipe = JSON.parse(window.localStorage.getItem(name));
	console.log("recipe retrieved:");
	console.log(retrievedRecipe);
	return retrievedRecipe;
}

function retrieveRecipeList() {
	var recipeArray = [];
	for (var i = 0; i < window.localStorage.length; i++) {
		recipeArray.push(window.localStorage.key(i));
	}
	return recipeArray;
}

function deleteRecipe(recipe) {
	var name = recipe.name;
	localStorage.removeItem(name);
}