const { Review, Leaderboard, User } = require('../models');

// GET all reviews or filter by gameId
const getReviews = async (req, res) => {
    try {
        const { gameId } = req.query;
        const whereClause = gameId ? { where: { gameId } } : {};
        const reviews = await Review.findAll(whereClause);

        if (reviews && reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).send('No reviews found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// GET all reviews by a specific user
const getReviewsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const reviews = await Review.findAll({ where: { userId } });

        if (reviews && reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).send('No reviews found for this user');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// POST - Add a review and update leaderboard
const addReview = async (req, res) => {
    try {
      const { userId, gameId, rating, comment } = req.body;
      const newReview = await Review.create({ userId, gameId, rating, comment });
      let leaderboard = await Leaderboard.findOne({ where: { userId } });
  
      // If leaderboard position doesn't exist for the user, create a new entry
      if (!leaderboard) {
        leaderboard = await Leaderboard.create({
          userId,
          totalReviews: 1,
          averageRating: rating,
        });
      } else {
        const userReviews = await Review.findAll({ where: { userId } });
  
        const totalReviews = userReviews.length;
        const averageRating = userReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  
        leaderboard.totalReviews = totalReviews;
        leaderboard.averageRating = averageRating;
        await leaderboard.save();
      }
  
      res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
};

// DELETE a review and update leaderboard
const deleteReview = async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
  
      const review = await Review.findByPk(reviewId);
      if (!review) {
        return res.status(404).send("Review not found");
      }
  
      await review.destroy();

      const userReviews = await Review.findAll({ where: { userId: review.userId } });
      const totalReviews = userReviews.length;
      const averageRating = totalReviews > 0
        ? userReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
        : 0; // If there are no reviews left, set average to 0
  
      const leaderboard = await Leaderboard.findOne({ where: { userId: review.userId } });
      leaderboard.totalReviews = totalReviews;
      leaderboard.averageRating = averageRating;
      await leaderboard.save();
  
      res.status(200).send("Review deleted and leaderboard updated");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
};


// PUT - Update a review and update leaderboard
const updateReview = async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const { rating, comment } = req.body;
  
      const review = await Review.findByPk(reviewId);
      if (!review) {
        return res.status(404).send("Review not found");
      }
  
      review.rating = rating;
      review.comment = comment;
      await review.save();

      const userReviews = await Review.findAll({ where: { userId: review.userId } });
      const totalReviews = userReviews.length;
      const averageRating = userReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  
      const leaderboard = await Leaderboard.findOne({ where: { userId: review.userId } });
      leaderboard.totalReviews = totalReviews;
      leaderboard.averageRating = averageRating;
      await leaderboard.save();
  
      res.status(200).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
};

module.exports = {
    getReviews,
    getReviewsByUser,
    addReview,
    deleteReview,
    updateReview,
};
