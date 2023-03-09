const bcrypt = require("bcrypt");
require("dotenv").config();

const TokensGen = require("../../controllers/TokensGen");
const QueryDB = require("../../controllers/QueryDB");

module.exports = function (app) {
  app.post("/auth/login", async (req, res) => {
    const Q = new QueryDB();
    const tokens = new TokensGen();

    try {
      const { login, password } = req.body;
      let candidate;

      await Q.query(`SELECT * FROM users WHERE login = ?`, [login]).then(
        (data) => {
          candidate = data[0];
        }
      );
      if (!candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким логином не найден" });
      }

      const validPassword = bcrypt.compareSync(password, candidate.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Введен не верный пароль" });
      }

      const accessToken = tokens.generateAccessToken(
        candidate.id,
        candidate.email,
        candidate.login,
        `${candidate.roleId === 2 ? "user" : "admin"}`
      );
      const refreshToken = tokens.generateRefreshToken(
        candidate.id,
        candidate.email,
        candidate.login,
        `${candidate.roleId === 2 ? "user" : "admin"}`
      );
      res.cookie("AToken", accessToken, { httpOnly: true });
      res.cookie("RToken", refreshToken, { httpOnly: true });

      return res.send({
        id: candidate.id,
        email: candidate.email,
        login: candidate.login,
        role: `${candidate.roleId === 2 ? "user" : "admin"}`,
        accessToken,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  });
};
