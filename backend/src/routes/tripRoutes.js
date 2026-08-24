import express from 'express';
import { createTrip } from '../controllers/tripController.js';
import Hotel from '../models/Hotel.js';

const router = express.Router();

router.post('/', createTrip);
router.get('/hotels', async (req, res) => {
  const { location } = req.query;
  const filter = location ? { location: new RegExp(location, 'i') } : {};
  const hotels = await Hotel.find(filter);
  res.json({ success: true, hotels });
});

export default router;
