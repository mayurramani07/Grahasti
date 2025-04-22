import express from "express";
import authRoute from './routes/auth.route.js'
import testRoute from './routes/test.route.js'
import userRoute from './routes/user.route.js'
import postRoute from './routes/post.route.js'
import chatRoute from './routes/chat.route.js'
import messageRoute from './routes/message.route.js'
import { connectDB } from "./lib/db.js";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/test', testRoute);
app.use('/api/posts', postRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
})