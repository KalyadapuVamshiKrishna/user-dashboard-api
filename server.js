import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
// No need to import 'process' explicitly in Node.js, it's global
import connectDB from './config/db.js'; 
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// ❌ REMOVED: import { all } from './node_modules/axios/index.d'; 
// (You should never import from node_modules using relative paths or .d files)

dotenv.config();

connectDB();

const app = express();

// --- FIXED CORS LOGIC ---
// If FRONTEND_URI is a single string, we put it in an array.
// If you have multiple URIs in your .env like "http://site1.com,http://site2.com", 
// then use process.env.FRONTEND_URI.split(',')
const allowedOrigins = [
  process.env.FRONTEND_URI, 
  'http://localhost:8080', 
  'http://localhost:5173' // Common Vite port
];

app.use(express.json());

app.use(cors({
  origin: allowedOrigins, // Passed the array directly
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});