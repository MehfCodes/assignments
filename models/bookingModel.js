const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  packages: [
    {
      package_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Meal Packages",
      },
      number: Number,
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: [true, "Booking must belong to a User!"],
  },
  totalPrice: {
    type: Number,
    require: [true, "Booking must have a price."],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
