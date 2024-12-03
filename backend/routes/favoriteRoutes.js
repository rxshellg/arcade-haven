const express = require('express');
const router = express.Router();
const {
    getFavoritesByUser,
    addFavoriteForUser,
    deleteFavoriteForUser,
} = require('../controllers/favoriteController');

// GET all favorites for a specific user
router.get('/users/:userId/favorites', getFavoritesByUser);

// ADD a favorite for a specific user
router.post('/users/:userId/favorites', addFavoriteForUser);

// DELETE a favorite for a specific user
router.delete('/users/:userId/favorites/:favoriteId', deleteFavoriteForUser);

module.exports = router;
