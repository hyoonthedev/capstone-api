const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require("uuid");

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

exports.uuid = (req, res) => {
    knex('users')
        .then((data) => {
            res.send(uuid())
        })
}