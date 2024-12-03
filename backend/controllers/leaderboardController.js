const { Leaderboard, User } = require('../models/index');

// GET all leaderboard entries
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findAll({
      include: {
        model: User,
        attributes: ['username']
      },
      order: [['totalReviews', 'DESC']],
    });

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// GET a specific user's leaderboard data
const getUserLeaderboard = async (req, res) => {
  try {
    const userId = req.params.userId;
    const leaderboard = await Leaderboard.findOne({
      where: { userId },
      include: {
        model: User,
        attributes: ['username']
      }
    });

    if (!leaderboard) {
      return res.status(404).send("Leaderboard data not found for this user.");
    }

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getLeaderboard,
  getUserLeaderboard
};
