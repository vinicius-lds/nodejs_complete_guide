import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const handleAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    next();
  } else {
    const token = authorizationHeader.split('Bearer ').join('');
    try {
      const decodedToken = verify(token, 'my secret');
      req.userId = (<any>decodedToken).userId;
      next();
    } catch (err) {
      next();
    }
  }
};
