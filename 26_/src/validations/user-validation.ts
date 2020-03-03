import { body, ValidationChain } from 'express-validator';

export const userPostValidation: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Invalid email'),
  body('name')
    .isLength({ min: 5 })
    .withMessage('Name has a min length of 5'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password has a min length of 5')
];
