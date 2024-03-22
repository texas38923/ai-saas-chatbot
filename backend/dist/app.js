import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
//to connect to mongodb database securely:
config();
//express app:
const app = express();
//middlewares:
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev')); //remove it when in production
app.use('/api/v1', appRouter);
export default app;
//# sourceMappingURL=app.js.map