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

// GET Selected Recipe
exports.getSelectedRecipe = (req, res) => {
    knex('recipes')
        .where({ id: req.params.id })
        .select(
            "id",
            "recipe_name",
            "cuisine",
            "servings",
            "total_cook_time",
            "image_url",
            "ingredients_line",
            "ingredients_base",
            "instructions"
        )
        .then((data) => {
            const newRecipe = data.map(item => { // Refactored ingredient names without "%20"
                let ingredients_base = item.ingredients_base.split("%20")
                let ingredients_line = item.ingredients_line.split("%20")
                let instructions = item.instructions.split("%20")
                return {
                    ...item,
                    ingredients_base,
                    ingredients_line,
                    instructions
                }
            })
            res.send(newRecipe)
        })
}

// Filter Recipe by ingredients (requires filter = array of ingredients to filter)
function filterRecipe(object, filter) {
    return object.map((recipe) => {
         let sum = 0
         for(i=0; i<filter.length; i++) {
             for(j=0; j<recipe.ingredients_base.length; j++) {
                 if(filter[i] === recipe.ingredients_base[j]) {
                     sum += 1
                 }
             }
         } if(sum === filter.length) {
             return recipe
         } else {
             return
         }
     })
 }

// Remove undefined
 const removeUD = function(array) {
    const newArr = []
    for(i=0; i<array.length; i++) {
        if(array[i]) {
            newArr.push(array[i])
        }
    } return newArr
}

// See if recipe is favourited
function favFilter(object, fav){
    return object.map((recipe) => {
      for (i=0; i<fav.length; i++) {
          if(recipe.id === fav[i].recipe_id) {
            return {
              ...recipe, favourite: true
            }
          }
      }

      return { ...recipe, favourite: false }
    })
}

// Get Recipes with pantry ingredients
exports.getSearchedRecipe = (req, res) => {
    knex('recipes')
        .select(
            "id",
            "recipe_name",
            "cuisine",
            "servings",
            "total_cook_time",
            "image_url",
            "ingredients_base",
        )
        .then((data) => {
            const newRecipeList = data.map(item => { // Refactored ingredient names without "%20"
                let ingredients_base = item.ingredients_base.split("%20")
                return {
                    ...item,
                    ingredients_base
                }
            })
            knex('pan')
                .where({ user_id: req.params.userId })
                .select(
                    "ingredient_name"
                )
                .then((data) => {
                    const filter = data.map(item => { // Combine panlist into array of strings
                        return item["ingredient_name"]
                    })
                    if(filter.length === 0) { // If nothing in filter, return empty recipe list
                        res.send([])
                    }
                    const arr = filterRecipe(newRecipeList, filter) // Filter recipe containing panlist
                   return removeUD(arr) // Remove undefined results

                })
                .then((array) => {
                    knex('favourites')
                        .where({ user_id: req.params.userId })
                        .then((data) => {
                            const finalArray = favFilter(array, data)
                            res.send(finalArray) // See if recipe is favourited
                        })
                })
                .catch((err) => {
                    console.log(err)
                })

        })
        .catch((err) => {
            console.log(err)
        })
}
