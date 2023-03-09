const jwt = require("jsonwebtoken");
const TokensGen = require("../../controllers/TokensGen");
require("dotenv").config();

const CookieJWTAuth = () => {
  const tokens = new TokensGen();

  return (req, res, next) => {
    const accessToken = req.cookies.AToken;
    const refreshToken = req.cookies.RToken;

    if (!accessToken)
      return res.status(404).json({ message: "Токен не найден" });
    if (!refreshToken)
      return res.status(401).json({ message: "Пользователь не авторизован" });

    jwt.verify(accessToken, process.env.SECRET_KEY, (error, decode) => {
      if (error) {
        if (error.message === "jwt expired") {
          jwt.verify(refreshToken, process.env.SECRET_KEY, (err, dec) => {
            if (err) {
              if (err.message === "jwt expired") {
                res.send({
                  id: dec.id,
                  email: dec.email,
                  login: dec.login,
                  role: dec.role,
                  accessToken: tokens.generateAccessToken(
                    dec.id,
                    dec.email,
                    dec.login,
                    dec.role
                  ),
                });
                return next();
              } else {
                return res
                  .status(406)
                  .json({ message: "Произошла ошибка в refresh токене", err });
              }
            }
          });
        } else {
          return res
            .status(406)
            .json({ message: "Произошла ошибка в access токене", error });
        }
      }

      return next();
    });
  };
};

module.exports = CookieJWTAuth;
