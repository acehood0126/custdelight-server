const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  console.log("auth middelware");

  const token = req.header("authorization");

  console.log("🚀 ~ file: auth.js ~ line 9 ~ token", token);

  // Check if not toekn
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  console.log(config.get("jwtSecret"));
  // Verify token
  try {
    jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        console.log(
          "🚀 ~ file: auth.js ~ line 24 ~ jwt.verify ~ decoded",
          decoded
        );

        next();
      }
    });
  } catch (err) {
    console.error("somethins wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
