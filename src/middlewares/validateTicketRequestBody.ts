import { body } from "express-validator";

const ticketValidationRules = () => {
  return [
    body("title")
    .not()
    .isEmpty()
    .withMessage("Title is required")
    .isLength({ min: 4, max: 100 })
    .withMessage("Title should be greater than 4 words"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10, max: 100 })
      .withMessage("Description should be greater than 10 words"),
  ];
};

export default ticketValidationRules;
