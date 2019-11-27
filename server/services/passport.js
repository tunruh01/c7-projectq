const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const keys = require("./config/keys");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

const googleLogin = new GoogleStrategy(
  {
    clientID: keys.CLIENT_ID,
    clientSecret: keys.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({
      googleId: profile.id
    }).then(existingUser => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        // we don't have a user record with this ID, make a new record!
        new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.picture
        })
          .save()
          .then(user => done(null, user));
      }
    });
  }
);

// Tell passport to use this strategy
passport.use(googleLogin);
