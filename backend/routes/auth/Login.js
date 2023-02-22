const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AuthQueryDB = require("../../controllers/AuthQuery");

module.exports = function (app) {
  app.post("/auth/login", async (req, res) => {
    const Q = new AuthQueryDB();

    const generateAccessToken = (id, email, login, password, role) => {
      let payload = {
        id,
        email,
        login,
        role,
      };

      return jwt.sign(payload, password, { expiresIn: "10m" });
    };

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

      const accessToken = generateAccessToken(
        candidate.id,
        candidate.email,
        candidate.login,
        candidate.password,
        `${candidate.roleId === 2 ? "user" : "admin"}`
      );
      return res.send({
        id: candidate.id,
        email: candidate.email,
        login: candidate.login,
        role: `${candidate.roleId === 2 ? "user" : "admin"}`,
        accessToken: accessToken,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  });
};
