const { param, validationResult } = require('express-validator')

const validateBookId = [
    param('bookId')
        .isString()
        .isMongoId()
        .notEmpty()
        .withMessage('BookId must be a valid oqject id'),
    
    (req, res, next) => {
        const errors = validationResult(req)
    
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .send({
                    statusCode: 400,
                    message: "validation failled",
                    errors: errors.array()
                })
        }
    
        next()

    }



]


module.exports = validateBookId
