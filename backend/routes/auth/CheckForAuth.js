const jwt = require("jsonwebtoken");
require("dotenv").config();

const TokensGen = require("../../controllers/TokensGen");

module.exports = (app) => {
  const tokens = new TokensGen();

  app.post("/api/checkAuth", (req, res) => {
    const accessToken = req.body.token;
    const refreshToken = req.cookies.token;

    if (!refreshToken) return { message: "Пользователь не авторизован" };

    try {
      jwt.verify(accessToken, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
          if (err.message === "jwt expired") {
            try {
              jwt.verify(
                refreshToken,
                process.env.SECRET_KEY,
                (error, decode) => {
                  if (error) {
                    if (error.message === "jwt expired") {
                      return res.status(403).json({
                        message: "Пользователь нуждается в авторизации",
                      });
                    }
                    return res.send(error);
                  }
                  return res.send({
                    id: decode.id,
                    email: decode.email,
                    login: decode.login,
                    role: decode.role,
                    accessToken: tokens.generateAccessToken(
                      decode.id,
                      decode.email,
                      decode.login,
                      decode.role
                    ),
                  });
                }
              );
            } catch (er) {
              return res
                .status(401)
                .json({ message: "Произошла ошибка с рефреш токеном. " + er });
            }
          }
        }

        return res.send({
          id: decode.id,
          email: decode.email,
          login: decode.login,
          role: decode.role,
          accessToken: accessToken,
        });
      });
    } catch (e) {
      return console.log(e);
    }
  });
};
