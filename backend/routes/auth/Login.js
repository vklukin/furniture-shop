const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AuthQueryDB = require("../../controllers/AuthQuery");

module.exports = function (app) {
    app.post("/api/login", async (req, res) => {
        const Q = new AuthQueryDB();

        const generateAccessToken = (id, email, login, password) => {
            let payload = {
                id,
                email,
                login,
            };

            return jwt.sign(payload, password, {expiresIn: "10m"});
        };

        try {
            const {login, password} = req.body;
            let client;

            await Q.query(`SELECT * FROM users WHERE login = ?`, login).then(
                (data) => {
                    client = data[0];
                }
            );

            if (!client) {
                return res.status(400).json({message: 'Пользователь с таким логином не найден'});
            }

            const validPassword = bcrypt.compareSync(password, client.password);
            if (!validPassword) {
                return res.status(400).json({message: 'Введен не верный пароль'});
            }

            const accessToken = generateAccessToken(client.id, client.email, client.login, client.password);
            return res.send({
                id: client.id,
                email: client.email,
                accessToken
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"});
        }
    });
};
