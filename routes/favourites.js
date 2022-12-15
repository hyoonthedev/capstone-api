// Required Variables
const express = require('express');
const router = express.Router();

const favouriteController = require('../controllers/favouriteController');

router
    .route('/:userId/:recipeId')
    .post(favouriteController.updateFavourite);

router
    .route('/:userId')
    .get(favouriteController.getFavouriteList);
    
module.exports = router;