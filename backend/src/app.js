import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'dotenv';
import tripRoutes from './routes/tripRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/trips', tripRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tripplanner')
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
