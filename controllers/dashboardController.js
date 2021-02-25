const Booking = require("./../models/bookingModel");
const { multipleMongooseToObj } = require("./../util/toObject");
async function getDashboard(req, res) {
  const { id, firstname, lastname, email } = req.session.user;
  const purchases = await Booking.findOne({ user: id, active: true }).populate(
    "packages.package_id"
  );
  // console.log(purchases.packages[0].package_id);
  if (purchases) {
    res.render("dashboard", {
      firstname,
      lastname,
      email,
      packages: multipleMongooseToObj(purchases.packages)
      .reverse(),
      totalPrice: purchases.totalPrice,
    });
  } else {
    res.render("dashboard",
     {
      firstname,
      lastname,
      email,
    });
  }
}
module.exports = { getDashboard };
