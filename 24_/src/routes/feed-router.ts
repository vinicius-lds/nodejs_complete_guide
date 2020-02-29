import express from 'express';
import PostController from '../controllers/feed/post-controller';

const feedRouter = express.Router();
const postController = new PostController();
const basePath = '/feed';

feedRouter.get(`${basePath}/post`, postController.get);
feedRouter.post(`${basePath}/post`, postController.post);

export default feedRouter;
