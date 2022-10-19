const jwt = require("jsonwebtoken");
const config = require("config");
const userService = require("../users/userService.js");
const userController = require("../users/userController.js");
const bcrypt = require("bcryptjs");
const { ERROR } = require("../../enum.js");

const { check, validationResult } = require("express-validator");
const widgetController = require("../widgets/widgetController.js");

const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log("🚀 ~ file: authController.js ~ line 12 ~ signin ~ email", email);

  try {
    let user = await userService.findOneByFilter({ email });

    console.log("se", user);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Unregistered email!" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // const isMatch = password === user.password;

    console.log("match", isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Password not correct!" }] });
    }

    const widgetdata = await widgetController.readWidget(user.widgetId1);
    console.log(
      "🚀 ~ file: authController.js ~ line 36 ~ signin ~ widgetdata",
      widgetdata
    );

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "5 days" },
      (err, accessToken) => {
        if (err) throw err;
        res.json({ accessToken, user, widgetdata });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;

  try {
    let user = await userController.findOneByFilter({ email });
    console.log("🚀 ~ file: authController.js ~ line 64 ~ signup ~ user", user);

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = {
      email,
      firstname,
      lastname,
      password,
    };
    console.log("🚀 ~ file: authController.js ~ line 71 ~ signup ~ user", user);

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    user = await userController.createUser(user);
    console.log("🚀 ~ file: authController.js ~ line 82 ~ signup ~ user", user);
    if (user === ERROR.USER_EXIST) {
      res.status(500).send(ERROR.USER_EXIST);
    }
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "5 days" },
      (err, accessToken) => {
        if (err) throw err;
        res.json({ accessToken, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const authController = {
  signup,
  signin,
};

module.exports = authController;
