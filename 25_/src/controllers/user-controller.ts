import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/user-model';
import { IUserModel } from './../models/user-model';

export class UserController {
  public login(req: Request, res: Response, next: NextFunction): void {
    let user: IUserModel;
    UserModel.findOne({ email: req.body.email })
      .then((userModel: IUserModel | null) => {
        if (!userModel) {
          res.status(401).json({ message: `No users with the email '${req.body.email}' were found` });
        } else {
          user = userModel;
          return bcrypt.compare(req.body.password, userModel.password || '');
        }
      })
      .then((result: boolean | undefined) => {
        if (result === false) {
          res.status(401).json({ message: 'Wrong password' });
        } else if (result === true) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id.toString()
            },
            'my secret',
            {
              expiresIn: '1h'
            }
          );
          res.status(200).json({ token: token, userId: user._id });
        }
      });
  }
  public post(req: Request, res: Response, next: NextFunction): void {
    bcrypt
      .hash(req.body.password, 12)
      .then(hashedPassword => {
        const userModel = new UserModel({
          email: req.body.email,
          password: hashedPassword,
          name: req.body.name,
          status: `I don't know what to put in this field`,
          posts: []
        });
        return userModel.save();
      })
      .then(userModel => {
        res.status(201).json(userModel.toResource());
      })
      .catch(next);
  }
}

export const userController = new UserController();
