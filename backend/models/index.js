const User = require('./User');
const Review = require('./Review');
const Favorite = require('./Favorite');
const Friendship = require('./Friendship');
const Leaderboard = require('./Leaderboard');

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

Friendship.belongsTo(User, { foreignKey: 'userId' });
Friendship.belongsTo(User, { foreignKey: 'friendUserId' });

User.hasOne(Leaderboard, { foreignKey: 'userId' });
Leaderboard.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Review,
  Favorite,
  Friendship,
  Leaderboard,
};
