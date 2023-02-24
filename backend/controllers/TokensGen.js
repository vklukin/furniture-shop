const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = class Tokens {
  generateAccessToken(id, email, login, role) {
    let payload = {
      id,
      email,
      login,
      role,
    };

    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRE_ACCESS_TOKEN,
    });
  }

  generateRefreshToken(id, email, login, role) {
    let payload = {
      id,
      email,
      login,
      role,
    };

    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRE_REFRESH_TOKEN,
    });
  }
};
