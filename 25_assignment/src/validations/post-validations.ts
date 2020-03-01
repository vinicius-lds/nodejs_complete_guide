import { body, check } from 'express-validator';
import { ValidationChain } from 'express-validator/src/chain';

export const postPostValidation: ValidationChain[] = [
  body('title')
    .isLength({ min: 5 })
    .withMessage('Title has a min length of 5'),
  body('content')
    .isLength({ min: 5 })
    .withMessage('Content has a min length of 5'),
  check('image')
    .custom((_, { req }) => !!req.file)
    .withMessage('Image is required')
];

export const postPutValidation: ValidationChain[] = [...postPostValidation];
