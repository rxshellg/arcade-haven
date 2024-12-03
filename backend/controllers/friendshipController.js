const { Sequelize } = require('sequelize');
const Friendship = require('../models/Friendship');

// GET all friendships for a user
const getFriendshipsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { status } = req.query;

        const whereCondition = status === 'pending' ? {
            [Sequelize.Op.or]: [
                { userId, status: 'pending' },
                { friendId: userId, status: 'pending' },
            ],
        } : {
            [Sequelize.Op.or]: [
                { userId },
                { friendId: userId },
            ],
        };

        const friendships = await Friendship.findAll({
            where: whereCondition,
        });

        if (friendships && friendships.length > 0) {
            res.status(200).json(friendships);
        } else {
            res.status(404).send('No friends found for this user!');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};


// ADD a friendship (send a friend request)
const addFriendship = async (req, res) => {
    try {
        const { userId, friendId } = req.params;

        if (userId === friendId) {
            return res.status(400).send("You can't be friends with yourself.");
        }

        const existingFriendship = await Friendship.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });

        if (existingFriendship) {
            return res.status(400).send('Friendship already exists or pending');
        }

        const newFriendship = await Friendship.create({
            userId,
            friendId,
            status: 'pending',
        });

        res.status(201).json(newFriendship);
    } catch (error) {
        res.status(500).send(error);
    }
};

// UPDATE friendship status
const updateFriendshipStatus = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const { status } = req.body;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).send('Invalid status');
        }

        const friendship = await Friendship.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });

        if (!friendship) {
            return res.status(404).send('Friendship not found');
        }

        // Update the status of the friendship
        friendship.status = status;
        await friendship.save();

        res.status(200).json(friendship);
    } catch (error) {
        res.status(500).send(error);
    }
};

// DELETE a friendship
const deleteFriendship = async (req, res) => {
    try {
        const { userId, friendId } = req.params;

        const friendship = await Friendship.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });

        if (!friendship) {
            return res.status(404).send('Friendship not found');
        }

        await friendship.destroy();
        res.status(200).send('Friendship deleted');
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getFriendshipsByUser,
    addFriendship,
    updateFriendshipStatus,
    deleteFriendship,
};
