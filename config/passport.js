var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const collections = require("../consts/collections");
const db = require("../db/config");
const User = require("../db/user");
exports.init = () => {
  {
    console.log("configuring passport");
    passport.use(
      new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username })
          .then(user => {
            if (!user) {
              return done(null, false);
            }
            if (!user.validPassword(password)) {
              return done(null, false);
            }
            return done(null, user);
          })
          .catch(e => {
            return done(null, false);
          });
      })
    );
  }

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.

  passport.serializeUser(function(user, cb) {
    cb(null, user.username);
  });

  passport.deserializeUser(function(user, cb) {
    User.findOne({ username: user })
      .then((user, err) => {
        console.log(err);
        if (err) {
          return cb(err);
        }
        cb(null, { username: user.username });
      })
      .catch(e => {
        return cb(e);
      });
  });
};
