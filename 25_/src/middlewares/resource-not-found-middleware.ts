import { NextFunction, Request, Response } from 'express';

export const handleResourceNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'Rosource not found',
    method: req.method,
    path: req.path
  });
};
