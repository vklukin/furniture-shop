const jwt = require("jsonwebtoken");
require("dotenv").config();

const TokensGen = require("../../controllers/TokensGen");

module.exports = (app) => {
  const tokens = new TokensGen();

  app.post("/api/checkAuth", (req, res) => {
    const accessToken = req.cookies.AToken;
    const refreshToken = req.cookies.RToken;

    if (!accessToken) return { message: "Токен не найден" };
    if (!refreshToken) return { message: "Пользователь не авторизован" };

    jwt.verify(accessToken, process.env.SECRET_KEY, (error, decode) => {
      if (error) {
        if (error.message === "jwt expired") {
          jwt.verify(refreshToken, process.env.SECRET_KEY, (err, dec) => {
            if (err) {
              if (err.message === "jwt expired") {
                return res.status(401).json({
                  message: "Пользователь нуждается в авторизации",
                });
              } else {
                return res.status(406).json({
                  message: "Произошла ошибка с refresh токеном. " + err,
                });
              }
            }
            return res.status(200).send({
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
          });
        } else {
          return res
            .status(406)
            .json({ message: "Произошла ошибка с access токеном. " + error });
        }
      }

      setTimeout(() => {
        if (decode) {
          return res.status(200).send({
            id: decode.id,
            email: decode.email,
            login: decode.login,
            role: decode.role,
            accessToken,
          });
        }
      });
    });
  });
};

// module.exports = (app) => {
//   const tokens = new TokensGen();
//
//   app.post("/api/checkAuth", (req, res) => {
//     const accessToken = req.cookies.AToken;
//     const refreshToken = req.cookies.RToken;
//
//     if (!accessToken) return { message: "Токен не найден" };
//     if (!refreshToken) return { message: "Пользователь не авторизован" };
//
//     try {
//       jwt.verify(accessToken, process.env.SECRET_KEY, (err, decode) => {
//         if (err) {
//           if (err.message === "jwt expired") {
//             try {
//               jwt.verify(
//                 refreshToken,
//                 process.env.SECRET_KEY,
//                 (error, decode) => {
//                   if (error) {
//                     if (error.message === "jwt expired") {
//                       return res.status(401).json({
//                         message: "Пользователь нуждается в авторизации",
//                       });
//                     }
//                     return res.status(401).send(error);
//                   }
//                   return res.send({
//                     id: decode.id,
//                     email: decode.email,
//                     login: decode.login,
//                     role: decode.role,
//                     accessToken: tokens.generateAccessToken(
//                       decode.id,
//                       decode.email,
//                       decode.login,
//                       decode.role
//                     ),
//                   });
//                 }
//               );
//             } catch (er) {
//               return res
//                 .status(406)
//                 .json({ message: "Произошла ошибка с рефреш токеном. " + er });
//             }
//           }
//         }
//
//         return res.send({
//           id: decode.id,
//           email: decode.email,
//           login: decode.login,
//           role: decode.role,
//           accessToken,
//         });
//       });
//     } catch (e) {
//       return console.log(e);
//     }
//   });
// };
