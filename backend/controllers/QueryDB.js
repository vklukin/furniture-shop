const db = require("../db");

module.exports = class QueryDB {
  query(sql, arg) {
    if (arg) {
      return new Promise((resolve, reject) => {
        db.query(sql, arg, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    }
  }
};
