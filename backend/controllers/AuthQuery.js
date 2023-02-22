const db = require("../db");

module.exports = class AuthQueryDB {
  query(sql, arg) {
    return new Promise((resolve, reject) => {
      db.query(sql, arg, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }
};
