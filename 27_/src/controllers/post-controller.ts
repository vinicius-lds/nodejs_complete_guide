import { NextFunction, Request, Response } from 'express';
import ServerSocket from '../infra/ServerSocket';
import { handleResourceNotFound } from '../middlewares/resource-not-found-middleware';
import { PostModel } from '../models/post-model';
import { UserModel } from '../models/user-model';
import { FileUtils, PUBLIC_DIR } from '../util/file-utils';
import { handleUnauthorizedResource } from './../middlewares/unauthorized-resource-middleware';
import { DatabaseUtils } from './../util/database-utils';

export class PostController {
  public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    const post = await PostModel.findById(req.params.postId);
    if (!post) {
      return handleResourceNotFound(req, res, next);
    } else if (post.creator?.toHexString() !== req.userId?.toString()) {
      return handleUnauthorizedResource(req, res, next);
    } else {
      FileUtils.delete(FileUtils.buildFilePath(PUBLIC_DIR, 'image', (post && post.imageUrl) || '')).catch(console.error);
      await post.remove();
      const user = await UserModel.findById(req.userId);
      if (user && user.posts) {
        user.posts = user.posts.filter(postId => postId.toString() !== req.params.postId.toString());
      }
      await (user && user.save());
      ServerSocket.emit('deletePost', req.params.postId);
      return res.status(200).json({ message: `Rosource '${req.path}' deleted successfuly` });
    }
  }

  public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    const post = await PostModel.findById(req.params.postId);
    if (!post) {
      return handleResourceNotFound(req, res, next);
    } else {
      return res.status(200).json(post.toResource());
    }
  }

  public async getPaginated(req: Request, res: Response, next: NextFunction): Promise<any> {
    const page = req.query.page || 1;
    const size = req.query.size || 2;
    const count = await PostModel.countDocuments();
    const posts = await PostModel.find()
      .sort({ cratedAd: -1 })
      .skip((page - 1) * size)
      .limit(size);
    return res.status(200).json({
      message: 'Fetched posts paginated',
      totalItems: count,
      posts: posts.map(post => post.toResource())
    });
  }

  public async post(req: Request, res: Response, next: NextFunction): Promise<any> {
    const post = await new PostModel({
      ...req.body,
      imageUrl: FileUtils.basename(req.file.path),
      creator: DatabaseUtils.toObjectId(req.userId)
    }).save();
    const user = await UserModel.findById(req.userId);

    if (user) {
      if (!user.posts) {
        user.posts = [];
      }
      user.posts.push(post._id);
      await user.save();
    }

    const completePost = (await post.populate('creator').execPopulate()).toResource();
    ServerSocket.emit('postPost', completePost);

    return res.status(201).json(completePost);
  }

  public async put(req: Request, res: Response, next: NextFunction): Promise<any> {
    const post = await PostModel.findById(req.params.postId);
    if (!post) {
      return handleResourceNotFound(req, res, next);
    } else if (post && post.creator && post.creator.toString() !== (req.userId && req.userId.toString())) {
      return handleUnauthorizedResource(req, res, next);
    } else {
      await FileUtils.delete(FileUtils.buildFilePath(PUBLIC_DIR, 'image', post.imageUrl || ''));
      post.title = req.body.title;
      post.content = req.body.content;
      post.imageUrl = FileUtils.basename(req.file.path);
      post.creator = DatabaseUtils.toObjectId(req.userId);
      await post.save();
      const completePost = (await post.populate('creator').execPopulate()).toResource();
      ServerSocket.emit('putPost', completePost);
      return res.status(201).json(completePost);
    }
  }
}

export const postController = new PostController();
