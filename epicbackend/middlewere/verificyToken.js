const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const tokenUser = req.header("authorization");

  if (!tokenUser) {
    return res.status(403).send({
      statusCode: 403,
      message: "Token not provided",
    });
  }

  try {
    const tokenVerified = jwt.verify(tokenUser, process.env.JWT_SECRET); // Correzione di 'process'
    req.user = tokenVerified;

    next();
  } catch (error) {
    res.status(403).send({
      statusCode: 403,
      message: "Token expired or not valid",
    });
  }
};
