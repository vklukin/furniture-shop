const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//auth
const CheckForAuth = require("./auth/CheckForAuth");
const Login = require("./auth/Login");
const Registration = require("./auth/Registration");

//admin page
const UploadFile = require("./admin/UploadFile");
const AddSoloProduct = require("./admin/AddSoloProduct");

module.exports = function (app) {
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  // app.use(fileUpload({}));

  // auth
  CheckForAuth(app);
  Login(app);
  Registration(app);

  // private routes through tokens
  // admin page
  UploadFile(app);
  AddSoloProduct(app);
};
