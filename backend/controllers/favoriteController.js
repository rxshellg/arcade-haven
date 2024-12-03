const Favorite = require('../models/Favorite');

// GET all favorites for a specific user
const getFavoritesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const favorites = await Favorite.findAll({ where: { userId } });

        if (favorites && favorites.length > 0) {
            res.status(200).json(favorites);
        } else {
            res.status(404).send('No favorites found for this user');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// ADD a favorite for a user
const addFavoriteForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { gameId } = req.body;

        const newFavorite = await Favorite.create({ userId, gameId });
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).send(error);
    }
};

// DELETE a favorite for a user
const deleteFavoriteForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const favoriteId = req.params.favoriteId;

        const favorite = await Favorite.findOne({ where: { id: favoriteId, userId } });

        if (!favorite) {
            res.status(404).send('Favorite not found or does not belong to the user');
        } else {
            await favorite.destroy();
            res.status(200).send('Favorite has been removed');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getFavoritesByUser,
    addFavoriteForUser,
    deleteFavoriteForUser,
};

