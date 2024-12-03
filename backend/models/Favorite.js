const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const Favorite = sequelize.define('Favorite', {
  gameId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Favorite;
