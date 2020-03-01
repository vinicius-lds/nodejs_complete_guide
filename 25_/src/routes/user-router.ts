import { Router } from 'express';
import { userController } from './../controllers/user-controller';
import { validationCheck } from './../middlewares/validation-check-middleware';
import { userPostValidation } from './../validations/user-validation';

const userRouter = Router();
const path = '/user';

userRouter.post(path, userPostValidation, validationCheck, userController.post);
userRouter.post(`${path}/login`, userController.login);

export default userRouter;
