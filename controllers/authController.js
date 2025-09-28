const User = require("../models/userModel");
const jwt = require("../utils/jwt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { title } = require("process");
const bcrypt = require("bcrypt");

const uploadDir = path.join(__dirname, "..", "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("photo");

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    // console.log(user);

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
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      } else {
        const { username, email, password } = req.body;
        const profile = req.file ? req.file.filename : null;
        console.log(profile);

        const result = await User.createUser(
          username,
          email,
          password,
          profile
        );

        if (typeof result === "string") {
          return res.render("./forms/signUpForm", { message: result });
        }

        return res.render("./forms/loginForm", {
          message: "User Created Successfully",
        });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.edit = async (req, res) => {
  console.log(req.params.id);
  const user = await User.findUserById(req.params.id);
  console.log(user);
  res.render("./forms/editForm", { user, title: "Edit Profile" });
};

exports.editUser = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      } else {
        const { id, username, email, password } = req.body;
        const profile = req.file ? req.file.filename : null;
        console.log(profile);

        let hashedPassword;

        if (password !== "") {
          const salt = await bcrypt.genSalt(10);
          hashedPassword = await bcrypt.hash(password, salt);
        } else {
          const oldUser = await User.findUserById(id);
          hashedPassword = oldUser.password;
        }

        const result = await User.editUser(
          id,
          username,
          email,
          hashedPassword,
          profile
        );

        if (typeof result === "string") {
          return res.render("./forms/editForm", { message: result });
        }

        return res.redirect("/dashboard");
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
