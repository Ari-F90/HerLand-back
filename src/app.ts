import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { errorsMiddleware } from './middlewares/errors.middlewares.js';
import { figuresRouter } from './router/figures.router.js';

const debug = createDebug('HER:app');
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/figures', figuresRouter);
app.get('/', (_req, resp) => {
  resp.json({
    info: 'HerLand',
    endpoints: '/figures',
  });
});

app.use(errorsMiddleware);
