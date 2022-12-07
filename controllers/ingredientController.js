const knex = require('knex')(require('../knexfile'));

// Add Ingredients
exports.addNewIngredient = (req, res) => {
    const body = req.body;
    const validation =
    body.ingredient_name &&
    body.category &&
    body.expiry;

    if(!validation) {
        return res.status(400).send("Please make sure to provide ingredient name, category and expiry fields in request")
    }

    const newIngredient = {
        ...body,
    };

    knex("ingredients")
        .insert(newIngredient)
        .then((data) => {
            return knex("ingredients")
                    .where({ id: data});
        })
        .then((data) => {
            res.status(201).send(data[0]);
        })
        .catch((err) => {
            res.status(400).send(`Error adding ingredient: ${err}`);
        })
}

// Get Saved Ingredients
exports.getIngredientsList = (req, res) => {
    knex("ingredients")
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

// Add Ingredients to Pan (Delete from IngredientsList)
exports.addIngredientsToPan = (req, res) => {
    knex("ingredients")
        .where({ id: req.params.id })
        .then((data) => {
            const ingredient = [...data]
            knex("ingredients")
                .del()
                .where({ id: req.params.id })
                .then(() => {
                    knex("pan")
                        .insert(ingredient[0])
                        .then((_data) => {
                            res.status(201).json({
                                message: `Successfully moved ingredient to pan`
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

// Delete Ingredient from IngredientList

exports.deleteIngredient = (req, res) => {
    knex('ingredients')
        .del()
        .where({ id: req.params.id})
        .then((_data) => {
            res.status(201).json({
                message: `Successfully removed ingredient`
            })
        })
        .catch((err) => {
            console.log(err)
        })
}