const express = require('express');
const passport = require('passport');
const { googleStrategyConfig } = require('../authConfig');

const router = express.Router();

// Route to start Google OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle callback from Google after authentication
router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Route to handle logout
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) console.error('Logout error:', err);
        res.redirect('/'); // Redirect to home page after logout
    });
});

module.exports = router;

