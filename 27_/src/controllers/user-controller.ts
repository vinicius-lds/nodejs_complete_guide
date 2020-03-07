import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/user-model';
import { handleResourceNotFound } from './../middlewares/resource-not-found-middleware';

export class UserController {
  public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: `No users with the email '${req.body.email}' were found` });
    } else if (await !bcrypt.compare(req.body.password, user.password || '')) {
      return res.status(401).json({ message: 'Wrong password' });
    } else {
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
      return res.status(200).json({ token: token, userId: user._id });
    }
  }
  public async getStatus(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleResourceNotFound(req, res, next);
    } else {
      return res.status(200).json({ status: user.status });
    }
  }
  public async patchStatus(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleResourceNotFound(req, res, next);
    } else {
      user.status = req.body.status;
      await user.save();
      res.status(200).json(user.toResource());
    }
  }
  public async post(req: Request, res: Response, next: NextFunction): Promise<any> {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const userModel = new UserModel({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      status: `I don't know what to put in this field`,
      posts: []
    });
    await userModel.save();
    res.status(201).json(userModel.toResource());
  }
}

export const userController = new UserController();
