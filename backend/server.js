
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';

import connectDB from './config/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

// Initialize express app
const app = express();
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));