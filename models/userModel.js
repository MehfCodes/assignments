const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  firstname: String,
  lastname: String,
  password: {
    type: String,
    minLength: 6,
    maxLength: 12,
  },
  role: {
    type: String,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (inputedPassword) {
  const isMatch = await bcrypt.compare(inputedPassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("Users", userSchema);
