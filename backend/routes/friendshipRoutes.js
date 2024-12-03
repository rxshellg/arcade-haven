const express = require('express');
const router = express.Router();
const {
    getFriendshipsByUser,
    addFriendship,
    updateFriendshipStatus,
    deleteFriendship,
} = require('../controllers/friendshipController');

// GET all friendships for a specific user
router.get('/users/:userId/friendships', getFriendshipsByUser);

// ADD a new friendship
router.post('/users/:userId/friendships/:friendId', addFriendship);

// UPDATE friendship status
router.put('/users/:userId/friendships/:friendId', updateFriendshipStatus);

// DELETE a friendship
router.delete('/users/:userId/friendships/:friendId', deleteFriendship);

module.exports = router;
