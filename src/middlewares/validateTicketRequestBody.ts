import { body } from "express-validator";

const ticketValidationRules = () => {
  return [
    body("description")
      .not()
      .isEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10, max: 100 })
      .withMessage("Description should be greater than 10 words"),
  ];
};

export default ticketValidationRules;
