const Query = require("../../controllers/QueryDB");
const CheckToken = require("../../middleware/auth/CookieJWTAuth");

module.exports = (app) => {
  const Q = new Query();

  app.get("/api/profile/:id/requests", CheckToken(), async (req, res) => {
    const userId = req.params.id;

    try {
      await Q.query("SELECT * FROM requests WHERE user_id = ?", [userId]).then(
        (data) => res.send(data)
      );
    } catch (e) {
      return res.send(e);
    }
  });
};
