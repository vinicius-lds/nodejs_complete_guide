import { NextFunction, Request, Response } from 'express';

export const handleResourceNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'Resource not found',
    method: req.method,
    path: req.path
  });
};
