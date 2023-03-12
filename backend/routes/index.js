const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//auth
const CheckForAuth = require("./auth/CheckForAuth");
const Login = require("./auth/Login");
const Registration = require("./auth/Registration");
const GetRequests = require("./auth/GetRequests");

//admin page
const UploadFile = require("./admin/UploadFile");
const AddSoloProduct = require("./admin/AddSoloProduct");
const UserRequests = require("./admin/UserRequests");

//main page
const GetProducts = require("./products/GetProducts");

module.exports = function (app) {
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  // auth
  CheckForAuth(app);
  Login(app);
  Registration(app);
  GetRequests(app);

  // private routes through tokens
  // admin page
  UploadFile(app);
  AddSoloProduct(app);
  UserRequests(app);

  // default pages
  //main page
  GetProducts(app);
};
