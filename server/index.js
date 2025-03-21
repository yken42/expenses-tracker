import express from 'express';
import { connectdb } from './db/connectdb.js';
import expenseRouter from './routes/expenseRouter.js'
import userRouter from './routes/userRouter.js';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT
connectdb();

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/expenses", expenseRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`app is listetning on port: ${PORT}`)
})