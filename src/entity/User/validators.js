const { body } = require('express-validator');

const getForgotPassword = [
    body('email').isString().isEmail(),
];

const getForgotPasswordRestore = [
    body('email').isString().isEmail(),
    body('token').isString(),
    body('password').isString().custom((value,{req}) => {
        if (value !== req.body.confirmPassword) {
            throw new Error("Password should match to confirmPassword field");
        } else {
            return value;
        }
    }),
    body('confirmPassword').isString().notEmpty().withMessage("Confirm Password should not be empty"),
];

module.exports = {
    getForgotPassword,
    getForgotPasswordRestore
};
