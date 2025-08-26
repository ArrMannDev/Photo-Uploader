const User = require("../models/userModel");
const jwt = require("../utils/jwt");

exports.login = async (req, res) => {
  res.render("./forms/loginForm", {
    title: "Sign In",
    message: "",
  });
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);

    if (user?.id) {
      const token = await jwt.generateToken(user);
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: false, 
        maxAge: 3600000, 
      });
      res.redirect("/dashboard");
    } else {
      return res.render("./forms/loginForm", { message: user }); // e.g., "Incorrect password"
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.signUp = async (req, res) => {
  res.render("./forms/signUpForm", {
    title: "Sign Up",
  });
};

exports.signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await User.createUser(username, email, password);

    if (typeof result === "string") {
      return res.render("./forms/signUpForm", { message: result });
    }

    return res.render("./forms/loginForm", {
      message: "User Created Successfully",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
