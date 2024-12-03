const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const Friendship = sequelize.define('Friendship', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Friendship;
