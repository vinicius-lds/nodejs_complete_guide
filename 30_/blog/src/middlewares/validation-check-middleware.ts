import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validationCheck = (req: Request, res: Response, next: NextFunction): void => {
  if (!validationResult(req).isEmpty()) {
    res.status(422).json({ errors: validationResult(req).array() });
  } else {
    next();
  }
};
