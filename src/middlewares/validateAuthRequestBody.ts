import { body } from "express-validator";

const userValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("email must be valid"),

    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ];
};

export { userValidationRules };
