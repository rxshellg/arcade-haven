const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const Leaderboard = sequelize.define('Leaderboard', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  averageRating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Leaderboard;
