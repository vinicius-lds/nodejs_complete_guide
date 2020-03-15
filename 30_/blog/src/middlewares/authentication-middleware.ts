import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const handleAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    const token = authorizationHeader.split('Bearer ').join('');
    try {
      const decodedToken = verify(token, 'my secret');
      req.userId = (<any>decodedToken).userId;
      next();
    } catch (err) {
      res.status(401).json({ message: `Token '${token}' is invalid` });
    }
  }
};
