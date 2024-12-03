const express = require('express');
const router = express.Router();
const { getLeaderboard, getUserLeaderboard } = require('../controllers/leaderboardController');

// GET all leaderboard entries
router.get('/', getLeaderboard);

// GET a specific user's leaderboard data
router.get('/:userId', getUserLeaderboard);

module.exports = router;
