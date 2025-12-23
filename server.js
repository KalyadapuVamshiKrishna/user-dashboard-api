import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import process from 'process';
import connectDB from './config/db.js'; // 1. Import connection
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { all } from './node_modules/axios/index.d';

dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

const allowedOrigins = [process.env.FRONTEND_URI , 'http://localhost:8080'];

// ... existing middleware ...
app.use(express.json());
app.use(cors(
    {
        origin: allowedOrigins.split(','),
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
))
app.use(morgan('dev'));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});