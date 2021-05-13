"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const ticketValidationRules = () => {
    return [
        express_validator_1.body("description")
            .not()
            .isEmpty()
            .withMessage("Description is required")
            .isLength({ min: 10, max: 100 })
            .withMessage("Description should be greater than 10 words"),
    ];
};
exports.default = ticketValidationRules;
//# sourceMappingURL=validateTicketRequestBody.js.map