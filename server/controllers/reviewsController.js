const Review = require('../models/reviewModel');

const submitReview = async (req, res) => {
    const { listingId, rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const newReview = await Review.create({ listingId, reviewerId: userId, rating, comment });
        res.status(201).json({ message: 'Review submitted successfully.', review: newReview });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).send('Server error');
    }
};

const getReviewsForListing = async (req, res) => {
    const { listingId } = req.params;

    try {
        const reviews = await Review.findByListingId(listingId);
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Server error');
    }
};

const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    try {
        const updatedReview = await Review.update(reviewId, { rating, comment });
        res.json({ message: 'Review updated successfully.', review: updatedReview });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).send('Server error');
    }
};

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const deletedReview = await Review.delete(reviewId);
        res.json({ message: 'Review deleted successfully.', review: deletedReview });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).send('Server error');
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.getAllReviews();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching all reviews:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    submitReview,
    getReviewsForListing,
    updateReview,
    deleteReview,
    getAllReviews
};
