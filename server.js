const express = require('express');
const sequelize = require('./src/server/dbConfig');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const googleStrategyConfig = require('./src/server/authConfig');
const oauthRoutes = require('./src/server/routes/oauthRoutes');

const { User } = require('./src/server/models');

const PORT = process.env.PORT || 4000;

const app = express();

// Passport setup for Google OAuth
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy(googleStrategyConfig, async (token, tokenSecret, profile, done) => {
    try {
        // Find or create the user based on oauthId
        const [user] = await User.findOrCreate({
            where: { oauthId: profile.id },
            defaults: {
                displayName: profile.displayName,
                email: profile.emails[0].value,
                oauthProvider: 'google',
                oauthId: profile.id,
            },
        });

        return done(null, user);
    } catch (err) {
        console.error('Error during Google OAuth:', err.message);
        return done(new Error('Failed to authenticate user via Google'), null);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use('/auth', oauthRoutes);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/auth/session', (req, res) => {
  if (req.isAuthenticated()) {
      res.json({
          isAuthenticated: true,
          user: {
            displayName: req.user.displayName,
            oauthId: req.user.oauthId,
          },
      });
  } else {
      res.json({
          isAuthenticated: false,
          user: null,
      });
  }
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