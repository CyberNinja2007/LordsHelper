const ApiError = require("../error/apiError.js");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.log("Возникла ошибка:");
  console.log(err);
  return res.status(500).json({ message: "Непредвиденная ошибка!" });
};
