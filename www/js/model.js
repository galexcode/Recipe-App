function saveRecipe(recipe) {
	window.localStorage.setItem(recipe.name, JSON.stringify(recipe));
}

function retrieveRecipe(name) {
	var retrievedRecipe = JSON.parse(window.localStorage.getItem(name));
	console.log("recipe retrieved: ["+name+"]");
	console.log(retrievedRecipe);
	return retrievedRecipe;
}

function retrieveRecipeList() {
	var recipeArray = [];
	for (var i = 0; i < window.localStorage.length; i++) {
		recipeArray.push(retrieveRecipe(window.localStorage.key(i)));
	}
	return recipeArray;
}

function deleteRecipe(recipe) {
	var name = recipe.name;
	localStorage.removeItem(name);
}

// function sortByKey(array, key) {	//	http://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key
//     return array.sort(function(a, b) {
//         var x = a[key]; var y = b[key];  //  passing in variable name as a string does not make sense
//         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//     });
// }

function retrieveRecipeListSortedByName() {
	var recipeArray = retrieveRecipeList();
	var recipeArraySorted = recipeArray.sort(function(a, b){
		var x = a.name; var y = b.name;
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
	//var sortedRecipeArray = sortByKey(recipeArray, name);
	return recipeArraySorted.reverse();
}

function retrieveRecipeListSortedByDate() {
	var recipeArray = retrieveRecipeList();
	var recipeArraySorted = recipeArray.sort(function(a, b){
		var x = a.date; var y = b.date;
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
	return recipeArraySorted;
}