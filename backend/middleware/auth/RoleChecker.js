const jwt = require("jsonwebtoken");

const RoleChecker = (role = "user") => {
  return (req, res, next) => {
    const accessToken = req.cookies.AToken;
    const decode = jwt.decode(accessToken);

    if (decode.role !== role) {
      return res
        .status(403)
        .json({ message: "У вас нет прав на совершение этого действия!" });
    }
    next();
  };
};

module.exports = RoleChecker;
