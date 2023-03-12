const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const QueryDB = require("../../controllers/QueryDB");

const jsonParser = bodyParser.json();

module.exports = function (app) {
  app.post("/auth/register", jsonParser, async (req, res) => {
    const Q = new QueryDB();

    try {
      const { name, login, email, password } = req.body;
      let candidate;

      await Q.query(`SELECT * FROM users WHERE login = ?`, [login]).then(
        (data) => {
          candidate = data;
        }
      );
      if (candidate.length > 0) {
        return res.status(400).json({
          message: "Пользователь с таким логином уже существует",
        });
      }
      await Q.query(`SELECT * FROM users WHERE email = ?`, [email]).then(
        (data) => {
          candidate = data;
        }
      );
      if (candidate.length > 0) {
        return res.status(400).json({
          message: "Пользователь с таким email адресом уже существует",
        });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      await Q.query(
        "INSERT INTO users (email, login, name, password, roleId) VALUES (?, ?, ?, ?, 2)",
        [email, login, name, hashPassword]
      ).then(() => res.send({ message: "Вы были успешно зарегистрированы!" }));
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Registration error" });
    }
  });
};
