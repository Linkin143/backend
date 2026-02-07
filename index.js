import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './configs/db.js';

// Route imports
import feedbackRoutes from './routes/feedback.route.js';
import messageRoutes from './routes/message.route.js';

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