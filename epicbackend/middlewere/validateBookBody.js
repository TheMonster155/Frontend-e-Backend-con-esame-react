/*const { body, validationResult } = require("express-validator");

const validateBookBody = [
  body("asin")
    .isString()
    .notEmpty()
    .withMessage("Asin is not valid, must be a string"),

  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is not valid. must be a string"),
  body("img")
    .isString()
    .notEmpty()
    .withMessage("Img is not valid. must be a string"),
  body("price")
    .isDecimal()
    .notEmpty()
    .withMessage("Price is not valid. must be a number"),
  body("category")
    .isString()
    .notEmpty()
    .withMessage("Category is not valid. must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        statusCode: 400,
        message: "validation failled",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateBookBody;
*/

const { body, validationResult } = require("express-validator");

const validationMessages = {
  asin: "Asin is not valid, must be a string",
  title: "Title is not valid, must be a string",
  img: "Img is not valid, must be a string",
  price: "Price is not valid, must be a decimal number",
  category: "Category is not valid, must be a string",
};

const validateBookBody = [
  body("asin").isString().notEmpty().withMessage(validationMessages.asin),
  body("title").isString().notEmpty().withMessage(validationMessages.title),
  body("img").isString().notEmpty().withMessage(validationMessages.img),
  body("price").isDecimal().notEmpty().withMessage(validationMessages.price),
  body("category")
    .isString()
    .notEmpty()
    .withMessage(validationMessages.category),
  handleValidationErrors,
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
}

module.exports = validateBookBody;
