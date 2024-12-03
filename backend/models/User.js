const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  oauthProvider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oauthId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
