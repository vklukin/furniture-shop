const CheckToken = require("../../middleware/auth/CookieJWTAuth");
const Query = require("../../controllers/QueryDB");

module.exports = function (app) {
  const Q = new Query();
  app.get("/api/get-products", CheckToken(), async (req, res) => {
    await Q.query(
      "SELECT products.*, category.* FROM products, category WHERE products.category_id = category.id"
    )
      .then((data) => res.send(data))
      .catch((e) => res.send(e));
  });
};
