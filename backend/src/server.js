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

// Serve Frontend Build in Production
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Safe database connection
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✓ Successfully connected to MongoDB Atlas'))
    .catch((err) => console.warn('MongoDB connection warning:', err.message));
} else {
  console.warn('⚠️ MONGO_URI not provided. App is running in standalone in-memory mode.');
}

// Start HTTP server immediately so Render health checks pass
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ Server running on port ${PORT}`);
});
