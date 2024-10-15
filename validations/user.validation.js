const { body, validationResult } = require('express-validator');

const userValidation = [
    body('name')
        .exists()
        .withMessage("Name is required")
        .notEmpty()
        // .trim()
        .withMessage("Name can't be empty")
        .isString()
        .withMessage("Name should be string"),

    body('email')
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email can't be empty")
        .isEmail()
        .withMessage("Provide valid email"),

    (req, res, next) => {
        console.log('req', req);
        
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0] })
        }
        next()
    }
];

module.exports = userValidation