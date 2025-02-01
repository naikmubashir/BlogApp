import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import postRoutes from './routes/postsRoute.js';
import userRoutes from './routes/usersRoute.js';
// import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
//app.use(cors());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Error handling
// app.use(errorHandler);

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});