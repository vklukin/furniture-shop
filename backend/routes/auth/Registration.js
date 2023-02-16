const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const AuthQueryDB = require("../../controllers/AuthQuery");

const jsonParser = bodyParser.json();

module.exports = function (app) {
  app.post("/api/register", jsonParser, async (req, res) => {
    const Q = new AuthQueryDB();

    try {
      const { name, login, email, password } = req.body;
      let client;

      await Q.query(
        `SELECT * FROM users WHERE email = ? OR login = ?`,
        email,
        login
      ).then((data) => {
        client = data;
      });
      if (client.length > 0) {
        return res.status(400).json({
          message:
            "Пользователь с таким email адресом или логином уже существует",
        });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      await Q.query(
        `INSERT INTO users (email, login, name, password) VALUES (?, ?, ?, ?)`,
        [email, login, name, hashPassword]
      ).then(() =>
        res.send({ message: "Пользователь был успешно зарегистрирован!" })
      );
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Registration error" });
    }
  });
};
