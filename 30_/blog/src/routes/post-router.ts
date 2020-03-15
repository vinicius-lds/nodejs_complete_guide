import express from 'express';
import { postController } from '../controllers/post-controller';
import { handleFileUpload } from '../middlewares/file-upload-middleware';
import { validationCheck } from '../middlewares/validation-check-middleware';
import { defaultImageUploadOptions } from '../util/file-upload-default-options';
import { postPostValidation, postPutValidation } from '../validations/post-validations';
import { handleAuthentication } from './../middlewares/authentication-middleware';

const postRouter = express.Router();
const basePath = '/post';

postRouter.delete(`${basePath}/:postId`, handleAuthentication, postController.delete);
postRouter.get(`${basePath}/:postId`, handleAuthentication, postController.get);
postRouter.get(basePath, handleAuthentication, postController.getPaginated);
postRouter.post(
  basePath,
  handleAuthentication,
  handleFileUpload('image', defaultImageUploadOptions),
  postPostValidation,
  validationCheck,
  postController.post
);
postRouter.put(
  `${basePath}/:postId`,
  handleAuthentication,
  handleFileUpload('image', defaultImageUploadOptions),
  postPutValidation,
  validationCheck,
  postController.put
);

export default postRouter;
