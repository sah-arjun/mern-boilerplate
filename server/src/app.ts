import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route';
import { logger } from './middlewares/logger.middleware';
import { notFound, errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
