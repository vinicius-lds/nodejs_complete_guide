import bodyParser from 'body-parser';
import express from 'express';
import { database } from './infra/Database';
import { setCommonHeaders } from './middlewares/header-commons-middleware';
import { handleInternalServerError } from './middlewares/internal-server-error-middleware';
import { handleResourceNotFound } from './middlewares/resource-not-found-middleware';
import postRouter from './routes/post-router';
import userRouter from './routes/user-router';
import { FileUtils, PUBLIC_DIR } from './util/file-utils';

const app = express();

app.use(bodyParser.json());
app.use(setCommonHeaders);
app.use(express.static(FileUtils.buildFilePath(PUBLIC_DIR)));

app.use(postRouter);
app.use(userRouter);

app.use(handleResourceNotFound);
app.use(handleInternalServerError);

database
  .connect()
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Server is up and running!');
    app.listen(8080);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB');
    console.error(err);
  });
