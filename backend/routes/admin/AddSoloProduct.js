const Query = require("../../controllers/QueryDB");
const RoleChecker = require("../../middleware/auth/RoleChecker");
const CheckToken = require("../../middleware/auth/CookieJWTAuth");

module.exports = function (app) {
  const Q = new Query();

  app.post(
    "/api/admin/add-product",
    CheckToken(),
    RoleChecker("admin"),
    async (req, res) => {
      const { title, price, category, description, specifications, url } =
        req.body;

      if (!title || !price || !category)
        return res
          .status(404)
          .json({ message: "Не найдено название или цена товара" });

      let categories;
      await Q.query(`SELECT * FROM CATEGORY WHERE category = ?`, [
        category,
      ]).then(async (data) => {
        if (data.length !== 0) {
          categories = data[0].id;
        } else {
          await Q.query("INSERT INTO category (category) VALUES (?)", [
            category,
          ])
            .then(async () => {
              await Q.query(`SELECT * FROM CATEGORY WHERE category = ?`, [
                category,
              ]).then((response) => {
                if (response) {
                  categories = response[0].id;
                } else {
                  return res.status(500).json({
                    message:
                      "Произошла ошибка с добавлением категории в базу данных",
                  });
                }
              });
            })
            .catch((e) => {
              return res.status(500).json({
                message:
                  "Произошла ошибка с добавлением категории в базу данных",
                e,
              });
            });
        }
      });

      await Q.query(
        "INSERT INTO products (title, price, description, specifications, url, category_id) VALUES (?, ?, ?, ?, ?, ?)",
        [title, parseFloat(price), description, specifications, url, categories]
      )
        .then(() => {
          return res.status(200).json({ message: "Товар успешно добавлен" });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  );
};
