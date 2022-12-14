const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require("uuid");

// Delete/Add Favourites
exports.updateFavourite = (req, res) => {
    knex('favourites')
        .where({ user_id: req.params.userId})
        .andWhere({ recipe_id: req.params.recipeId })
        .then((data) => {
            if(!data.length) {
                knex('favourites')
                    .insert({
                        recipe_id: req.params.recipeId,
                        user_id: req.params.userId,
                        status: true
                    })
                    .then(() => {
                        res.status(200).send("Recipe succesfully favourited")
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } if(data.length) {
                knex('favourites')
                .del()
                .where({ user_id: req.params.userId})
                .andWhere({ recipe_id: req.params.recipeId })
                .then(() => {
                    res.status(200).send("Recipe successfully unfavourited")
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

// Get List of Favourite Recipes from User
exports.getFavouriteList = (req, res) => {
    knex('favourites')
        .join('recipes', 'recipes.id', 'favourites.recipe_id')
        .where({ user_id: req.params.userId })
        .select(
            "recipe_id",
            "status",
            "recipe_name",
            "image_url",
            "cuisine"
        )
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
        })
}