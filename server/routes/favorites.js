// const express = require('express');
// const router = express.Router();
// const favoriteController = require('../controllers/favoriteController');
// const authenticateToken = require('../middleware/authenticateToken');


// router.get('/', authenticateToken, favoriteController.getFavorites);
// router.get('/', authenticateToken, favoriteController.getUserFavorites);
// router.delete('/:listingId', authenticateToken, favoriteController.removeFromFavorites);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { addToFavorites, getUserFavorites, removeFromFavorites, getAllFavorites } = require('../controllers/favoriteController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, getUserFavorites);
router.post('/', authenticateToken, addToFavorites);
router.delete('/:listingId', authenticateToken, removeFromFavorites);
// Note: getAllFavorites route might be missing or unnecessary based on provided snippets.

module.exports = router;
