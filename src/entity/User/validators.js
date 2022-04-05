const { body } = require('express-validator');

const getForgotPassword = [
    body('email').isString().isEmail(),
];

const getForgotPasswordRestore = [
    body('email').isString().isEmail(),
    body('token').isString(),
    body('password').isString().equals('confirmPassword').withMessage("Password should match to confirmPassword field"),
    body('confirmPassword').isString().notEmpty().withMessage("Confirm Password should not be empty"),
];

module.exports = {
    getForgotPassword,
    getForgotPasswordRestore
};
