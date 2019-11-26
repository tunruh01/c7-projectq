const passport = require("passport");
//below loads passport don't remove
const passportService = require("./services/passport");

const authRoutes = require("./routes/auth-routes");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

module.exports = function(app) {
  app.use("/auth", authRoutes);

  // if it's already login, send the profile response,
  // otherwise, send a 401 response that the user is not authenticated
  // authCheck before navigating to home page
  app.get("/", authCheck, (req, res) => {
    res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  });
};
