const mongoose = require("mongoose");
mealPackageSchema = mongoose.Schema(
  {
    name: String,
    describe: String,
    price: Number,
    number: Number,
    category: String,
    imgSrc: String,
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Meal Packages", mealPackageSchema);
