import express from 'express';
import Trip from '../models/Trip.js';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// Fetch sample/all hotels
router.get('/hotels', async (req, res) => {
  try {
    let hotels = await Hotel.find({});
    // Seed default hotels if database is empty on first run
    if (hotels.length === 0) {
      hotels = await Hotel.insertMany([
        { name: 'Grand Elysée Hotel', location: 'Paris Central', pricePerNight: 220, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' },
        { name: 'Riviera Boutique Stay', location: 'Nice Promenade', pricePerNight: 160, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500' },
        { name: 'Alpine View Lodge', location: 'Chamonix Valley', pricePerNight: 195, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500' }
      ]);
    }
    res.json({ success: true, hotels });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save Itinerary and Compute Total
router.post('/calculate-and-save', async (req, res) => {
  try {
    const { destination, startDate, endDate, hotelId, activities = [] } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalNights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

    let accommodationCost = 0;
    if (hotelId) {
      const hotel = await Hotel.findById(hotelId);
      if (hotel) accommodationCost = hotel.pricePerNight * totalNights;
    }

    const activitiesCost = activities.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
    const totalCost = accommodationCost + activitiesCost;

    const trip = await Trip.create({
      destination,
      startDate: start,
      endDate: end,
      hotel: hotelId || null,
      activities,
      totalNights,
      totalCost
    });

    res.status(201).json({ success: true, trip });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
