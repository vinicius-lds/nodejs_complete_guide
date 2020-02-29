import bodyParser from 'body-parser';
import express from 'express';
import { setCommonHeaders } from './middlewares/header-commons-middleware';
import feedRouter from './routes/feed-router';

const app = express();

app.use(bodyParser.json());
app.use(setCommonHeaders);

app.use(feedRouter);

console.log('Server is up and running!');
app.listen(8080);
