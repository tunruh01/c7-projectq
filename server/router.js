const passport = require("passport");
//below loads passport don't remove
const passportService = require("./services/passport");

const authRoutes = require("./routes/auth-routes");
const mainRoutes = require("./routes/main");

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
  app.use("/api", mainRoutes);
};
