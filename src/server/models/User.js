const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const User = sequelize.define('User', {
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
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