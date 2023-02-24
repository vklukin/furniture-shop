const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = CookieJWTAuth = (req, res, next) => {
  const accessToken = req.body.token;

  if (!accessToken) {
    return res.status(403).json("Пользователь не авторизован");
  }

  try {
    req.user = jwt.verify(accessToken, process.env.SECRET_KEY);
    next();
  } catch (e) {

  }
};
