const express = require('express');
const sequelize = require('./backend/dbConfig');
const path = require('path');
const app = express();

const reviewRoutes = require('./backend/routes/reviewRoutes');
const favoriteRoutes = require('./backend/routes/favoriteRoutes');
const friendshipRoutes = require('./backend/routes/friendshipRoutes');
const leaderboardRoutes = require('./backend/routes/leaderboardRoutes');

const { User, Review, Favorite, Friendship, Leaderboard } = require('./backend/models');

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/friendships', friendshipRoutes);
app.use('/api/leaderboards', leaderboardRoutes);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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