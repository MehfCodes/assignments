const {
  signUp,
  validateAndSendEmail,
  login,
  logout,
} = require("../controllers/authController");
const { isAuthenticated } = require("../controllers/middlewars");
const { getDashboard } = require("../controllers/dashboardController");
const express = require("express");
const route = express.Router();
route.get("/login", (req, res) => {
  res.render("login");
});
route.get("/register", (req, res) => {
  res.render("register");
});
route.post("/login", login);
route.post("/register", validateAndSendEmail, signUp);
route.get("/logout", logout);
route.get("/dashboard", isAuthenticated, getDashboard);
module.exports = route;
