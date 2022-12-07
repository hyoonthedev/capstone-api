const knex = require('knex')(require('../knexfile'));

// Encode API Data
const config = {
    headers:{
        'Accept-Encoding': 'application/json',
    }
};

// Variables
const axios = require('axios');
const { API_URL, API_KEY, APP_KEY } = process.env;

// Get ID from URL
function getRecipeId(href) {
   const splitString = href.split("")
   const newString = []
   for (i = 38; i < 70; i++) {
    newString.push(splitString[i])
   }
   return newString.join("")
}

// GET Random Featured Recipes
exports.getFeaturedRecipes = (_req, res) => {
    axios
        .get(`${API_URL}?type=public&app_id=${APP_KEY}&app_key=${API_KEY}&mealType=Dinner&random=true`, config)
        .then((response) => {
            res.status(200).json(response.data.hits.map((recipe) => {
                return{
                    name: recipe.recipe.label,
                    image: recipe.recipe.images.REGULAR.url,
                    cuisine: recipe.recipe.cuisineType[0],
                    id: getRecipeId(recipe._links.self.href)
                }
            }))
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving recipes :( ${err}`);
    });
};

// GET Selected Recipe
exports.getSelectedRecipe = (req, res) => {
    axios
    .get(`${API_URL}/${req.params.id}?type=public&app_id=${APP_KEY}&app_key=${API_KEY}&random=true`, config)
    .then((response) => {
        const { recipe } = response.data;
        res.status(200).json({
            name: recipe.label,
            image: recipe.images.REGULAR.url,
            ingredients: recipe.ingredientLines,
            cuisine: recipe.cuisineType[0],
            mealType: recipe.mealType,
            dishType: recipe.dishType,
            recipeSource: recipe.source,
            recipeUrl: recipe.url,
            dietLabels: recipe.dietLabels,
            healthLabels: recipe.healthLabels
        })
    })
    .catch((err) => {
        res.status(400).send(`Error retrieving recipe :( ${err}`);
    });
   }

// GET searched recipe list
exports.getSearchedRecipe = (req, res) => {
    axios
    .get(`${API_URL}?type=public&q=${req.body.query}&app_id=${APP_KEY}&app_key=${API_KEY}&random=true`, config)
    .then((response) => {
        res.status(200).json(response.data.hits.map((recipe) => {
            return{
                name: recipe.recipe.label,
                image: recipe.recipe.images.REGULAR.url,
                cuisine: recipe.recipe.cuisineType[0],
                id: getRecipeId(recipe._links.self.href),
                mealType: recipe.recipe.mealType,
                dishType: recipe.recipe.dishType,
                ingredients: recipe.recipe.ingredientLines
            }
        }))
    })
    .catch((err) => {
        res.status(400).send(`Error retrieving recipes :( ${err}`);
});
};
