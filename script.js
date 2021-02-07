function showMealData() {
  const mealName = document.getElementById("input-meal").value;
  if (mealName == "") {
    document.getElementsById("error").innerHTML = `
    <h2>Please Enter A Name</h2>`;
  } else getMealData(mealName);
}

const getMealData = (inputMeal) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
    .then((res) => res.json())
    .then((data) => displayMealItems(data.meals))
    .catch((error) => alert("error"));
};

const displayMealItems = (meals) => {
  const mealDisplayArea = document.getElementById("meal-area");
  meals.map((meal) => {
    console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal-item";
    const mealInfo = `
    <img src ="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>`;
    mealDiv.innerHTML = mealInfo;
    mealDiv.addEventListener("click", () => recipeDetails(meal.idMeal));
    mealDisplayArea.appendChild(mealDiv);
  });
};
const recipeDetails = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => displayIngredient(data.meals));
};
const displayIngredient = (recipes) => {
  const recipeDetails = document.getElementById("recipe-ingredient");
  dataClear("recipe-ingredient");
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
const dataClear = (id) => {
  const itemDetails = document.getElementById(id);
  itemDetails.innerHTML = "";
};
