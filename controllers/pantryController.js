const knex = require('knex')(require('../knexfile'));

// Add Ingredients to IngredientList (Delete from Pan)
exports.addIngredientsToIngredientList = (req, res) => {
    knex("pan")
        .where({ id: req.params.id })
        .then((data) => {
            const ingredient = [...data]
            knex("pan")
                .del()
                .where({ id: req.params.id })
                .then(() => {
                    knex("ingredients")
                        .insert(ingredient[0])
                        .then((data) => {
                            res.status(201).json({
                                message: `Successfully moved ingredient to ingredient list`
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

// GET pantry list
exports.getPantryList = (req, res) => {
    knex('pan')
        .select(
            "ingredient_name",
            "category",
            "expiry",
            "id"
        )
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving ingredients: ${err}`);
        });
    }

// DELETE all ingredients from pantry list
exports.deletePantry = (_req, res) => {
    knex('pan')
        .del()
        .then((_data) => {
            res.status(201).json({
                message: `Successfully removed all ingredients from pantry`
            })
        })
        .catch((err) => {
            console.log(err)
        })
}