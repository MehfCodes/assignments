const User = require("./../models/userModel");
const nodemailer = require("nodemailer");
async function signUp(req, res, next) {
  try {
    let newUser = await User.create(req.body);
    req.session.user = {
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
    };
    res.status(200).redirect("/dashboard");
  } catch (e) {
    console.log(e);
  }
}

async function login(req, res, next) {
  // console.log(req.body);
  let messages = [];
  if (!req.body.email || !req.body.password) {
    messages.push("Please fill out the form");
    res.render("login", { messages });
  } else {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) {
      res.render("login", { messages: ["user not found"] });
    } else {
      if (await user.comparePassword(req.body.password)) {
        req.session.user = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        };

        res.redirect("/dashboard");
      } else {
        res.render("login", {
          messages: ["the entered password is not correct"],
        });
      }
    }
  }
}

function logout(req, res) {
  req.session.reset();
  res.redirect("/login");
}
async function validateAndSendEmail(req, res, next) {
  let messages = [];
  // console.log(req.body);
  if (!req.body.firstname || !req.body.lastname) {
    messages.push("Please fill out the form");
  }
  if (req.body.password.length < 6 || req.body.password.length > 12) {
    messages.push("Password length must 6 to 12");
  }
  if (
    (!req.body.password.match(/[a-z]/g) ||
      !req.body.password.match(/[A-Z]/g)) &&
    !req.body.password.match(/[1-9]/g)
  ) {
    messages.push("Password must contain letters and numbers");
  }
  if (!req.body.email.includes("@")) {
    messages.push("Please enter valid email");
  }
  if (req.body.lastname.length < 4) {
    messages.push("Last name must be more than 3 characters");
  }
  if (messages.length > 0) {
    res.render("register", { messages, body: req.body });
  } else {
    let email = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });
    const mailOption = {
      from: " assignment.hesam@gmail.com",
      to: req.body.email,
      subject: "welcome message",
      text: `hello ${req.body.firstname} welcome to our website`,
    };

    try {
      await email.sendMail(mailOption);
    } catch (err) {
      console.log("email not sent", err);
    }
    next();
  }
}

module.exports = { signUp, validateAndSendEmail, login, logout };
