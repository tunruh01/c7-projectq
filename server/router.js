const passport = require("passport");
//below loads passport don't remove
const passportService = require("./services/passport");

const requireGoogle = passport.authenticate("google", {
  scope: ["profile", "email"]
});

function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401);
    res.send("User Not Logged In");
  }
}

module.exports = function(app) {
  app.get("/auth/google", requireGoogle);
  app.get("/auth/google/callback", requireGoogle, (req, res) => {
    res.send("You're logged in via Google!");
  });
  app.get("/api/current_user", isUserAuthenticated, (req, res) => {
    res.send(req.user);
  });
  app.get("/api/current_user2", (req, res) => {
    res.send("You can get here without being logged into google");
  });
};
