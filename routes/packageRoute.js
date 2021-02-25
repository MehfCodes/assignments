const {
  mealPackages,
  veiwPackage,
  addToOrder,
  placeOrder,
} = require("../controllers/packageController");
const { isAuthenticated } = require("./../controllers/middlewars");
const express = require("express");

const route = express.Router();

route.get("/", mealPackages);
route.get("/:id", veiwPackage);
route.post("/:id/:price/add-to-order", isAuthenticated, addToOrder);
route.post("/purchase/place-order", isAuthenticated, placeOrder);
module.exports = route;
