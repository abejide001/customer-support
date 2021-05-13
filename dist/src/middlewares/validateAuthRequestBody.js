"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const userValidationRules = () => {
    return [
        express_validator_1.body("email")
            .not()
            .isEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("email must be valid"),
        express_validator_1.body("password")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Password is required")
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters"),
    ];
};
exports.userValidationRules = userValidationRules;
//# sourceMappingURL=validateAuthRequestBody.js.map