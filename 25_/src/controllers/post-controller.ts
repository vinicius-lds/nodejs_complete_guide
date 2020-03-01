import { NextFunction, Request, Response } from 'express';
import { handleResourceNotFound } from '../middlewares/resource-not-found-middleware';
import { IPostModel, PostModel } from '../models/post-model';
import { UserModel } from '../models/user-model';
import { FileUtils, PUBLIC_DIR } from '../util/file-utils';
import { handleUnauthorizedResource } from './../middlewares/unauthorized-resource-middleware';
import { IUserModel } from './../models/user-model';
import { DatabaseUtils } from './../util/database-utils';

export class PostController {
  public delete(req: Request, res: Response, next: NextFunction): void {
    PostModel.findById(req.params.postId)
      .then(post => {
        if (!post) {
          handleResourceNotFound(req, res, next);
        } else if (post.creator !== DatabaseUtils.toObjectId(req.userId)) {
          handleUnauthorizedResource(req, res, next);
        } else {
          FileUtils.delete(FileUtils.buildFilePath(PUBLIC_DIR, 'image', (post && post.imageUrl) || '')).catch(console.error);
          return post.remove();
        }
      })
      .then((post: any) => {
        if (post) {
          return UserModel.findById(req.userId);
        }
      })
      .then((user: IUserModel | null | undefined) => {
        if (user && user.posts) {
          user.posts = user.posts.filter(postId => postId.toString() !== req.params.postId.toString());
          return user.save();
        }
      })
      .then((user: IUserModel | undefined) => {
        res.status(200).json({ message: `Rosource '${req.path}' deleted successfuly` });
      })
      .catch(next);
  }

  public get(req: Request, res: Response, next: NextFunction): void {
    PostModel.findById(req.params.postId)
      .then(post => {
        if (!post) {
          handleResourceNotFound(req, res, next);
        } else {
          res.status(200).json(post.toResource());
        }
      })
      .catch(next);
  }

  public getPaginated(req: Request, res: Response, next: NextFunction): void {
    const page = req.query.page || 1;
    const size = req.query.size || 2;
    const state = { count: 0 };
    PostModel.countDocuments()
      .then((count: number) => {
        state.count = count;
        return PostModel.find()
          .skip((page - 1) * size)
          .limit(size);
      })
      .then((posts: IPostModel[]) => {
        res.status(200).json({
          message: 'Fetched posts paginated',
          totalItems: state.count,
          posts: posts.map(post => post.toResource())
        });
      })
      .catch(next);
  }

  public post(req: Request, res: Response, next: NextFunction): void {
    const post = new PostModel({ ...req.body, imageUrl: FileUtils.basename(req.file.path), creator: DatabaseUtils.toObjectId(req.userId) });
    post
      .save()
      .then(post => {
        return UserModel.findById(req.userId);
      })
      .then(user => {
        if (user) {
          if (!user.posts) {
            user.posts = [];
          }
          user.posts.push(post._id);
          return user.save();
        }
      })
      .then(user => {
        res.status(201).json(post.toResource());
      })
      .catch(next);
  }

  public put(req: Request, res: Response, next: NextFunction): void {
    PostModel.findById(req.params.postId)
      .then((post: any) => {
        if (!post) {
          handleResourceNotFound(req, res, next);
        } else if (post.creator.toString() !== (req.userId && req.userId.toString())) {
          handleUnauthorizedResource(req, res, next);
        } else {
          FileUtils.delete(FileUtils.buildFilePath(PUBLIC_DIR, 'image', post.imageUrl)).catch(console.error);
          post.title = req.body.title;
          post.content = req.body.content;
          post.imageUrl = FileUtils.basename(req.file.path);
          post.creator = req.userId && req.userId.toString();
          return post.save();
        }
      })
      .then((post: any) => {
        if (post) {
          return res.status(201).json(post.toResource());
        }
      })
      .catch(next);
  }
}

export const postController = new PostController();
