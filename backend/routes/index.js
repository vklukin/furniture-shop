const cors = require("cors");
const bodyParser = require("body-parser");

//auth
const Login = require("./auth/Login");
const Registration = require("./auth/Registration");

module.exports = function (app) {
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(bodyParser.json());

  // auth
  Login(app);
  Registration(app);

  //  store
};
