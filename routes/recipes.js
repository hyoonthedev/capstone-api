// Required Variables
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router
    .route('/:userId/search')
    .get(recipeController.getSearchedRecipe);

router
    .route('/:id')
    .get(recipeController.getSelectedRecipe);

module.exports = router;