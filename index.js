import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';

// Route imports
import feedbackRoutes from './routes/feedbackRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});