
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const authHeader = req.header("Auth");

  if (!authHeader) {
    return res.status(403).send({
      statusCode: 403,
      message: "Token not provided",
    });
  }

  const tokenUser = authHeader.split(" ")[1]; 
  if (!tokenUser) {
    return res.status(403).send({
      statusCode: 403,
      message: "Token not provided",
    });
  }

  try {
    const tokenVerified = jwt.verify(tokenUser, process.env.JWT_SECRET);
    req.user = tokenVerified;
    next();
  } catch (error) {
    res.status(403).send({
      statusCode: 403,
      message: "Token expired or not valid",
    });
  }
};



