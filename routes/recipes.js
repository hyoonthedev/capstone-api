// Required Variables
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');


router
    .route('/featured')
    .get(recipeController.getFeaturedRecipes);

router
    .route('/:id')
    .get(recipeController.getSelectedRecipe);

module.exports = router;