const { param, validationResult } = require("express-validator");

const validateBookId = [
  param("id") // Assicurati che il nome del parametro corrisponda a quello nella route
    .isString()
    .isMongoId()
    .notEmpty()
    .withMessage("ID libro non valido, deve essere un oggetto id valido"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        statusCode: 400,
        message: "Validazione fallita",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateBookId;
