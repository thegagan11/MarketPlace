// const express = require('express');
// const router = express.Router();
// const reviewsController = require('../controllers/reviewsController');
// const authenticateToken = require('../middleware/authenticateToken');

// router.post('/', authenticateToken, reviewsController.submitReview);
// router.get('/listing/:listingId', reviewsController.getReviewsForListing);
// router.put('/:reviewId', authenticateToken, reviewsController.updateReview);
// router.delete('/:reviewId', authenticateToken, reviewsController.deleteReview);


// router.delete('/:reviewId', authenticateToken(['admin']), reviewsController.deleteReview);


// module.exports = router;


const express = require('express');
const router = express.Router();
const { submitReview, getReviewsForListing, updateReview, deleteReview, getAllReviews } = require('../controllers/reviewsController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, submitReview);
router.get('/listing/:listingId', getReviewsForListing);
router.put('/:reviewId', authenticateToken, updateReview);
router.delete('/:reviewId', authenticateToken, deleteReview);
// Additional admin-specific delete route if necessary
router.delete('/:reviewId', authenticateToken, deleteReview);

module.exports = router;

