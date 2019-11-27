const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user);
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
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({
      googleId: profile.id
    }).then(existingUser => {
      console.log("access token: ", accessToken);
      console.log("refresh token: ", refreshToken);
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
