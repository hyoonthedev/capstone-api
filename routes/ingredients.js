// Required Variables
const express = require('express');
const router = express.Router();

const ingredientController = require("../controllers/ingredientController");

router
    .route('/')
    .get(ingredientController.getIngredientsList)
    .post(ingredientController.addNewIngredient);

router
    .route('/:id')
    .delete(ingredientController.deleteIngredient)
    .post(ingredientController.addIngredientsToPan);

module.exports = router;