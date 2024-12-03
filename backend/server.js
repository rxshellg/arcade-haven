const express = require('express');
const sequelize = require('./dbConfig');
const app = express();

const { User, Review, Favorite, Friendship, Leaderboard } = require('./models');

const PORT = process.env.PORT || 4000;

app.use(express.json());

const init = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

init();