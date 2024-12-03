const express = require('express');
const router = express.Router();
const {
    getReviews,
    getReviewsByUser,
    addReview,
    deleteReview,
    updateReview,
} = require('../controllers/reviewController');

// GET all reviews or reviews by gameId
router.get('/reviews', getReviews);

// GET all reviews by a specific user
router.get('/users/:userId/reviews', getReviewsByUser);

// POST - add a review
router.post('/reviews', addReview);

// DELETE a review by ID
router.delete('/reviews/:id', deleteReview);

// PUT - update a review by ID
router.put('/reviews/:id', updateReview);

module.exports = router;
