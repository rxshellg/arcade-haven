const express = require('express');
const passport = require('passport');

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

router.get('/session', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({
            isAuthenticated: true,
            user: {
                displayName: req.user.displayName,
                email: req.user.email,
                userId: req.user.oauthId
            },
        });
    }
    res.json({ isAuthenticated: false, user: null });
});

module.exports = router;