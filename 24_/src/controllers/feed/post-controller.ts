import { NextFunction, Request, Response } from 'express';

export default class PostController {
  public get(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      posts: [
        {
          title: 'Some Post',
          content: 'Just a post'
        }
      ]
    });
  }

  public post(req: Request, res: Response, next: NextFunction) {
    res.status(201).json({
      message: 'Post created successfuly',
      post: { ...req.body }
    });
  }
}
