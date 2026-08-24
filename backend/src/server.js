import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import tripRoutes from './routes/tripRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', tripRoutes);

// Health check route for Render
app.get('/healthz', (req, res) => res.status(200).send('OK'));

// Serve Frontend Build in Production on Render
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Database connection & server start
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripplanner';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    // Still listen so Render health checks don't fail immediately during initial setup
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running without DB on port ${PORT}`);
    });
  });
