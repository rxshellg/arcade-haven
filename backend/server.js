const express = require('express');
const sequelize = require('./dbConfig');
const app = express();

const reviewRoutes = require('./routes/reviewRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const friendshipRoutes = require('./routes/friendshipRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const { User, Review, Favorite, Friendship, Leaderboard } = require('./models');

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/friendships', friendshipRoutes);
app.use('/api/leaderboards', leaderboardRoutes);

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