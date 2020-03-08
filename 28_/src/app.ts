import bodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import graphqlHttp from 'express-graphql';
import graphqlResolvers from './graphql/resolvers';
import graphqlSchema from './graphql/schema';
import Server from './infra/Server';
import { handleAuthentication } from './middlewares/authentication-middleware';
import { handleFileUpload } from './middlewares/file-upload-middleware';
import { setCommonHeaders } from './middlewares/header-commons-middleware';
import { handleInternalServerError } from './middlewares/internal-server-error-middleware';
import { handleResourceNotFound } from './middlewares/resource-not-found-middleware';
import { defaultImageUploadOptions } from './util/file-upload-default-options';
import { FileUtils, PUBLIC_DIR } from './util/file-utils';

Server.init({
  port: 8080,
  registerRoutes(app: Express) {
    app.use(bodyParser.json());
    app.use(setCommonHeaders);
    app.use(express.static(FileUtils.buildFilePath(PUBLIC_DIR)));
    app.use(handleAuthentication);

    app.put('/post-image', handleFileUpload('image', defaultImageUploadOptions), (req: Request, res: Response, next: NextFunction) => {
      if (!req.userId) {
        return res.status(201).json({ message: 'Unauthorized' });
      } else if (!req.file) {
        return res.status(200).json({ message: 'No file provided!' });
      } else if (req.body.oldPath) {
        FileUtils.delete(FileUtils.buildFilePath(PUBLIC_DIR, 'image', req?.body?.oldPath || '')).catch(console.error);
      }
      return res.status(201).json({ message: 'File stored!', filePath: FileUtils.basename(req.file.path) });
    });

    app.use(
      '/graphql',
      graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
        customFormatErrorFn(err) {
          // It's called every time a error is thrown
          console.error(err);
          if (!err.originalError) {
            return err;
          } else {
            const oe: any = err.originalError;
            return {
              message: oe.errorMessage,
              errors: oe.errors,
              code: oe.errorCode
            };
          }
        }
      })
    );

    app.use(handleResourceNotFound);
    app.use(handleInternalServerError);
  }
});
