const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router
    .route('/')
    .get(profileController.getProfile);

router
    .route('/:username')
    .get(profileController.getUserId);
    
module.exports = router;