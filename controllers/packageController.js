const Package = require("./../models/mealPackageModel");
const { multipleMongooseToObj } = require("./../util/toObject");
const Booking = require("../models/bookingModel");
const nodemailer = require("nodemailer");

async function mealPackages(req, res) {
  const packages = multipleMongooseToObj(await Package.find({}));
  res.render("packages", { packages });
}

async function veiwPackage(req, res) {
  const package = await Package.findById(req.params.id);
  //   console.log(package);
  res.render("package-describtion", package);
}

async function addToOrder(req, res) {
  const cart = await Booking.findOne({
    user: req.session.user.id,
    active: true,
  });
  if (cart) {
    console.log(cart);
    let packageIndex = cart.packages.findIndex(
      (p) => p.package_id == req.params.id
    );
    console.log(packageIndex);
    if (packageIndex != -1) {
      let package = cart.packages[packageIndex];
      package.number = req.body.number;
      cart.packages[packageIndex] = package;
    } else {
      cart.packages.push({
        package_id: req.params.id,
        number: req.body.number,
      });
    }

    cart.totalPrice = cart.totalPrice + req.params.price * req.body.number;
    await cart.save();
    res.redirect("/dashboard");
  } else {
    const newCart = await Booking.create({
      packages: [{ package_id: req.params.id, number: req.body.number }],
      user: req.session.user.id,
      totalPrice: req.params.price * req.body.number,
    });
    res.redirect("/dashboard");
  }
  res.redirect("/dashboard");
}

async function placeOrder(req, res) {
  const cart = await Booking.findOneAndUpdate(
    { user: req.session.user.id, active: true },
    { active: false },
    { new: true }
  );
  let email = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });
  const mailOption = {
    from: " assignment.hesam@gmail.com",
    to: req.session.user.email,
    subject: "shopping cart",
    text: `hello ${req.session.user.firstname}, Your cart is empty `,
  };

  try {
    await email.sendMail(mailOption);
  } catch (err) {
    console.log("email not sent", err);
  }

  res.redirect("/dashboard");
}
module.exports = {
  mealPackages,
  veiwPackage,
  addToOrder,
  placeOrder,
};
