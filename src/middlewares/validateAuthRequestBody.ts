import { body } from "express-validator";

const userValidationRules = () => {
  return [
    body("email")
      .not()
      .isEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email must be valid"),

    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ];
};

export { userValidationRules };
