import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import logger from './logger/logger.js';
import { authenticate } from './middlewares/auth.middleware.js';
import authRouter from './routes/auth.routes.js';
import pingRouter from './routes/ping.routes.js';
import userRouter from './routes/user.routes.js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', authRouter);
app.use('/api/v1', authenticate, userRouter);
app.use('/health', pingRouter);

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
