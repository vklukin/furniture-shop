const db = require("../db");

module.exports = class AuthQueryDB {
  query(sql, ...args) {
    return new Promise((resolve, reject) => {
      db.query(sql, [args], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};
