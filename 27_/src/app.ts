import bodyParser from 'body-parser';
import express, { Express } from 'express';
import Server from './infra/Server';
import { setCommonHeaders } from './middlewares/header-commons-middleware';
import { handleInternalServerError } from './middlewares/internal-server-error-middleware';
import { handleResourceNotFound } from './middlewares/resource-not-found-middleware';
import postRouter from './routes/post-router';
import userRouter from './routes/user-router';
import { FileUtils, PUBLIC_DIR } from './util/file-utils';

Server.init({
  port: 8080,
  registerRoutes(app: Express) {
    app.use(bodyParser.json());
    app.use(setCommonHeaders);
    app.use(express.static(FileUtils.buildFilePath(PUBLIC_DIR)));

    app.use(postRouter);
    app.use(userRouter);

    app.use(handleResourceNotFound);
    app.use(handleInternalServerError);
  }
});
