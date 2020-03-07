import { NextFunction, Request, Response } from 'express';

export const handleInternalServerError = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  console.error(err);
  return res.status(500).json({
    message: 'Internal Server Error',
    error: err
  });
};
