import { compare, hash } from 'bcryptjs';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import validator from 'validator';
import { UserModel } from '../models/user-model';
import { DatabaseUtils } from '../util/database-utils';
import { FileUtils, PUBLIC_DIR } from '../util/file-utils';
import { PostModel } from './../models/post-model';
import GraphQLError from './graphql-error';

export default {
  async createUser({ userInput }: any) {
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push('E-mail is invalid');
    }
    if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5 })) {
      errors.push('Password not found or too short');
    }
    if (await UserModel.findOne({ email: userInput.email })) {
      errors.push('User already exists');
    }

    if (errors.length) {
      throw new GraphQLError({ errors: errors, errorMessage: 'Invalid input', errorCode: 422 });
    }

    const hashedPassword = await hash(userInput.password, 12);

    const user = new UserModel({
      ...userInput,
      password: hashedPassword,
      status: `Some status, i don't know...`
    });

    const storedUser = await user.save();
    return { ...storedUser.toResource(), _id: user._id.toString() };
  },
  async login(args: any) {
    const user = await UserModel.findOne({ email: args.email });
    if (!user) {
      throw new GraphQLError({ errorMessage: 'Invalid user' });
    }
    if (!(await compare(args.password, user.password || ''))) {
      throw new GraphQLError({ errorMessage: 'Password incorrect' });
    }
    const token = sign(
      {
        userId: user._id.toString(),
        email: user.email
      },
      'my secret',
      {
        expiresIn: '1h'
      }
    );
    return { token: token, userId: user._id.toString() };
  },
  async createPost({ postInput }: any, req: Request) {
    if (!req.userId) {
      throw new GraphQLError({ errorMessage: 'Unauthorized', errorCode: 401 });
    }
    const errors = [];

    if (validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, { min: 5 })) {
      errors.push('Title too short');
    }
    if (validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, { min: 5 })) {
      errors.push('Content too short');
    }
    if (errors.length) {
      throw new GraphQLError({ errors: errors, errorMessage: 'Invalid input', errorCode: 422 });
    }
    console.log(JSON.stringify(postInput));
    const post: any = await new PostModel({
      ...postInput,
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
    return {
      ...post._doc,
      _id: post._doc._id.toString(),
      creator: { ...user?.toResource() },
      createdAt: post._doc.createdAt.toISOString(),
      updatedAt: post._doc.updatedAt.toISOString()
    };
  },
  async posts(args: any, req: Request) {
    if (!req.userId) {
      throw new GraphQLError({ errorMessage: 'Unauthorized', errorCode: 401 });
    }
    const totalPosts = await PostModel.estimatedDocumentCount();
    const posts = await PostModel.find()
      .skip(((args.page || 1) - 1) * 2)
      .limit(2)
      .sort({ createdAt: -1 })
      .populate('creator');
    return {
      posts: posts.map(post => {
        return {
          ...post.toResource(),
          _id: post._id.toString(),
          createdAt: (<any>post)._doc.createdAt.toISOString(),
          updatedAt: (<any>post)._doc.updatedAt.toISOString()
        };
      }),
      totalPosts: totalPosts
    };
  },
  async post({ id }: any, req: Request) {
    if (!req.userId) {
      throw new GraphQLError({ errorMessage: 'Unauthorized', errorCode: 401 });
    }
    const post = await PostModel.findById(id).populate('creator');
    if (!post) {
      throw new GraphQLError({ errorMessage: 'No post found', errorCode: 404 });
    }
    return {
      ...post.toResource(),
      _id: post._id.toString(),
      createdAt: (<any>post)._doc.createdAt.toISOString(),
      updatedAt: (<any>post)._doc.updatedAt.toISOString()
    };
  },
  async updatePost(args: any, req: Request) {
    if (!req.userId) {
      throw new GraphQLError({ errorMessage: 'Unauthorized', errorCode: 401 });
    }
    const { id, postInput } = args;
    const post = await PostModel.findById(id).populate('creator');
    if (!post) {
      throw new GraphQLError({ errorMessage: 'No post found', errorCode: 404 });
    }
    if ((<any>post.creator)._id.toString() !== req.userId.toString()) {
      throw new GraphQLError({ errorMessage: 'Unauthorized', errorCode: 401 });
    }
    const errors = [];

    if (validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, { min: 5 })) {
      errors.push('Title too short');
    }
    if (validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, { min: 5 })) {
      errors.push('Content too short');
    }
    if (errors.length) {
      throw new GraphQLError({ errors: errors, errorMessage: 'Invalid input', errorCode: 422 });
    }
    post.title = postInput.title;
    post.content = postInput.content;
    if (postInput.imageUrl) {
      post.imageUrl = postInput.imageUrl;
    }
    const updatedPost = await post.save();
    return {
      ...updatedPost.toResource(),
      _id: updatedPost._id.toString(),
      createdAt: (<any>updatedPost)._doc.createdAt.toISOString(),
      updatedAt: (<any>updatedPost)._doc.updatedAt.toISOString()
    };
  },
  async deletePost(args: any, req: Request) {
    if (!req.userId) {
      throw new GraphQLError({ errorMessage: 'Unauthorized', errorCode: 401 });
    }
    const post = await PostModel.findById(args.id);
    if (!post) {
      throw new GraphQLError({ errorMessage: 'No post found', errorCode: 404 });
    }
    if (post.creator?.toString() !== req.userId.toString()) {
      throw new GraphQLError({ errorMessage: 'Unauthorized', errorCode: 401 });
    }

    const user = await UserModel.findById(req.userId);
    if (user) {
      user.posts = user?.posts?.filter(postId => postId.toString() !== post._id.toString());
    }
    FileUtils.delete(FileUtils.buildFilePath(PUBLIC_DIR, 'image', post.imageUrl || '')).catch(console.error);
    await post.remove();
    await user?.save();
    return true;
  },
  async user(args: any, req: Request) {
    if (!req.userId) {
      throw new GraphQLError({ errorMessage: 'Unauthorized', errorCode: 401 });
    }
    const user = await UserModel.findById(req.userId);
    if (!user) {
      throw new GraphQLError({ errorMessage: 'No user found', errorCode: 404 });
    }
    return {
      ...user.toResource(),
      _id: user._id.toString()
    };
  },
  async updateStatus(args: any, req: Request) {
    if (!req.userId) {
      throw new GraphQLError({ errorMessage: 'Unauthorized', errorCode: 401 });
    }
    const user = await UserModel.findById(req.userId);
    if (!user) {
      throw new GraphQLError({ errorMessage: 'No user found', errorCode: 404 });
    }
    user.status = args.status;
    await user.save();
    return {
      ...user.toResource(),
      _id: user._id.toString()
    };
  }
};
