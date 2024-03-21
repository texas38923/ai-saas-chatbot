import express from 'express';
import { config } from 'dotenv';
//to connect to mongodb database securely:
config();
const app = express();
//middlewares:
app.use(express.json());
export default app;
//# sourceMappingURL=app.js.map