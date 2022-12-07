// Required Variables
const express = require('express');
const router = express.Router();

const ingredientController = require("../controllers/pantryController");

router
    .route('/')
    .get(ingredientController.getPantryList)
    .delete(ingredientController.deletePantry);
    
router
    .route('/:id')
    .post(ingredientController.addIngredientsToIngredientList);

module.exports = router;