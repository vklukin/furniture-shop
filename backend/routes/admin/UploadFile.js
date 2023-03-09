const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const fileUpload = require("express-fileupload");

const fileExtLimiter = require("../../middleware/upload/fileExtLimiter");
const CheckToken = require("../../middleware/auth/CookieJWTAuth");
const RoleChecker = require("../../middleware/auth/RoleChecker");
const QueryDB = require("../../controllers/QueryDB");

module.exports = (app) => {
  app.use(fileUpload());

  const Q = new QueryDB();

  app.post(
    "/api/admin/upload",
    CheckToken(),
    RoleChecker("admin"),
    fileExtLimiter([".csv"]),
    (req, res) => {
      async function readRes(arrayOfResult) {
        if (arrayOfResult.length !== 0) {
          const objectKeys = Object.keys(arrayOfResult[0]);

          // validate column keys
          if (
            objectKeys[0] === "title" &&
            objectKeys[1] === "price" &&
            objectKeys[2] === "description" &&
            objectKeys[3] === "specifications" &&
            objectKeys[4] === "category" &&
            objectKeys[5] === "url"
          ) {
            let arrOfValues = [];
            for (let obj of arrayOfResult) {
              let categories;
              await Q.query(`SELECT * FROM category WHERE category = ?`, [
                obj.category,
              ]).then(async (data) => {
                if (data.length !== 0) {
                  categories = data[0].id;
                } else {
                  await Q.query("INSERT INTO category (category) VALUES (?)", [
                    obj.category,
                  ])
                    .then(async () => {
                      await Q.query(
                        `SELECT * FROM category WHERE category = ?`,
                        [obj.category]
                      ).then((response) => {
                        if (response) {
                          categories = response[0].id;
                        } else {
                          return res.status(500).json({
                            message:
                              "Произошла ошибка с импортом категорий в базу данных",
                          });
                        }
                      });
                    })
                    .catch((e) => {
                      res.status(500).json({
                        message:
                          "Произошла ошибка с импортом категорий в базу данных",
                        e,
                      });
                    });
                }
              });

              arrOfValues.push([
                obj.title,
                parseFloat(obj.price),
                obj.description,
                obj.specifications,
                obj.url,
                categories,
              ]);
            }
            await Q.query(
              "INSERT INTO products (title, price, description, specifications, url, category_id) VALUES ?",
              [arrOfValues]
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Продукты успешно импортированы" })
              )
              .catch((e) => {
                return res
                  .status(500)
                  .json({ message: "Произошла ошибка с файлом" });
              });
          } else {
            return res.status(412).json({
              message:
                "Неверное название столбцов. Используйте названия и порядок столбцов как в примере",
            });
          }
        } else {
          return res.status(400).json({ message: "Пустой файл" });
        }
      }

      const file = req.files.file;
      const results = [];

      if (!file) {
        return res.status(404).json({ message: "Файл не дошел до сервера" });
      }

      const filename = Date.now();
      file.mv(path.join(__dirname, "../..", "UploadFiles", `${filename}`));

      setTimeout(() => {
        fs.createReadStream(
          path.join(__dirname, "../..", "UploadFiles", `${filename}`)
        )
          .pipe(csv({ separator: ";" }))
          .on("data", (data) => {
            results.push(data);
          })
          .on("end", () => {
            readRes(results).finally(() => {
              fs.unlink(
                path.join(__dirname, "../..", "UploadFiles", `${filename}`),
                (err) => {
                  if (err) console.log(err);
                }
              );
            });
          });
      });
    }
  );
};
