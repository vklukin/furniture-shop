const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//auth
const CheckForAuth = require("./auth/CheckForAuth");
const Login = require("./auth/Login");
const Registration = require("./auth/Registration");

module.exports = function (app) {
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  // auth
  CheckForAuth(app);
  Login(app);
  Registration(app);

  // private routes through tokens
};
