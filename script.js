//Search button click display meal
function DisplayMealData() {
  const mealName = document.getElementById("input-meal").value;
  if (mealName === "") {
    alert("Please write your favorite dish name"); //error massage for empty input value
  } else getMealData(mealName);
}
//render all Meals from Api
const getMealData = (inputMeal) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
    .then((res) => res.json())
    .then((data) => displayMealItems(data.meals))
    .catch((error) => alert("Please check your URL"));
};
//Display all render Meals to browser
const displayMealItems = (meals) => {
  const mealDisplayArea = document.getElementById("meal-area");
  const itemDetails = document.getElementById("meal-area");
  itemDetails.innerHTML = "";//refresh meals every search
  meals.map((meal) => {
    console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal-item";
    const mealInfo = `
    <img src ="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>`;
    mealDiv.innerHTML = mealInfo;
    mealDiv.addEventListener("click", () => recipeDetails(meal.idMeal)); //function to display selected meal ingredients as modal
    mealDisplayArea.appendChild(mealDiv);
  });
};
// render only clicked recipe from api
const recipeDetails = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => displayIngredient(data.meals));
};
//Display Ingredient In Modal
const displayIngredient = (recipes) => {
  const recipeDetails = document.getElementById("recipe-ingredient");

  const itemDetails = document.getElementById("recipe-ingredient");
  itemDetails.innerHTML = ""; //Empty Ingredient every time
  recipes.map((recipe) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe-item";
    const recipeName = document.createElement("h1");
    recipeName.className = "recipe-name";
    recipeName.innerText = recipe.strMeal;
    const Ingredient = document.createElement("h3");
    Ingredient.innerText = `Ingredients:`;
    const ulTag = document.createElement("ul");
    const ingredientInfo = `
         <li>${recipe.strIngredient1}</li>
         <li>${recipe.strIngredient2}</li>
         <li>${recipe.strIngredient3}</li>
         <li>${recipe.strIngredient4}</li>
         <li>${recipe.strIngredient5}</li>
         <li>${recipe.strIngredient6}</li>
         <li>${recipe.strIngredient7}</li>
    `;
    ulTag.innerHTML = ingredientInfo;
    recipeDetails.appendChild(recipeDiv);
    recipeDiv.appendChild(recipeName);
    recipeName.appendChild(Ingredient);
    Ingredient.appendChild(ulTag);
  });
};
