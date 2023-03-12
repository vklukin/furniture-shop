const RoleChecker = require("../../middleware/auth/RoleChecker");
const CheckToken = require("../../middleware/auth/CookieJWTAuth");
const Query = require("../../controllers/QueryDB");

module.exports = function (app) {
  const Q = new Query();

  app.get(
    "/api/admin/get-requests",
    CheckToken(),
    RoleChecker("admin"),
    async (req, res) => {
      await Q.query(
        "select requests.*, users.id, users.email, users.login from users, requests where requests.user_id = users.id;"
      )
        .then((data) => {
          return res.send(data);
        })
        .catch((e) => {
          return res.send(e);
        });
    }
  );
};
