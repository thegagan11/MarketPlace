const Favorite = require('../models/favoriteModels');

const addToFavorites = async (req, res) => {
    const userId = req.user.id;
    const { listingId } = req.body;

    try {
        const addedFavorite = await Favorite.addToFavorites(userId, listingId);
        res.status(201).json({ message: 'Added to favorites successfully.', favorite: addedFavorite });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        res.status(500).send('Server error');
    }
};

const getUserFavorites = async (req, res) => {
    const userId = req.user.id;

    try {
        const favorites = await Favorite.findByUserId(userId);
        res.json(favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).send('Server error');
    }
};

const removeFromFavorites = async (req, res) => {
    const userId = req.user.id;
    const { listingId } = req.params;

    try {
        const removedFavorite = await Favorite.removeFromFavorites(userId, listingId);
        res.json({ message: 'Removed from favorites successfully.', removed: removedFavorite });
    } catch (error) {
        console.error('Error removing from favorites:', error);
        res.status(500).send('Server error');
    }
};

const getAllFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.getAllFavorites();
        res.json(favorites);
    } catch (error) {
        console.error('Error fetching all favorites:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    addToFavorites,
    getUserFavorites,
    removeFromFavorites,
    getAllFavorites
};
