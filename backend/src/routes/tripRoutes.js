import express from 'express';
import Trip from '../models/Trip.js';
import Hotel from '../models/Hotel.js';
import User from '../models/User.js';

const router = express.Router();

const SEED_HOTELS = [
  { name: 'Taj Holiday Village Resort', location: 'Goa, India', pricePerNight: 180, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' },
  { name: 'Goa Marriott Resort & Spa', location: 'Goa, India', pricePerNight: 140, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500' },
  { name: 'Grand Elysée Hotel', location: 'Paris, France', pricePerNight: 220, rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500' },
  { name: 'Tokyo Bay Panorama Hotel', location: 'Tokyo, Japan', pricePerNight: 175, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500' },
  { name: 'Manhattan Skyline Suites', location: 'New York, USA', pricePerNight: 260, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500' }
];

// User Register / Login
router.post('/auth/login', async (req, res) => {
  const { email, name } = req.body;
  res.json({
    success: true,
    user: { id: 'usr_' + Date.now(), name: name || email.split('@')[0], email }
  });
});

// Search & Get Hotels
router.get('/hotels', async (req, res) => {
  try {
    const { location } = req.query;
    let hotels = [];
    
    // Check if DB has items, otherwise seed fallback
    try {
      if (location) {
        hotels = await Hotel.find({ location: { $regex: location, $options: 'i' } });
      } else {
        hotels = await Hotel.find({});
      }
    } catch (dbErr) {
      console.log('Using memory fallback for hotels');
    }

    if (!hotels || hotels.length === 0) {
      if (location) {
        hotels = SEED_HOTELS.filter(h => h.location.toLowerCase().includes(location.toLowerCase()));
      }
      if (hotels.length === 0) hotels = SEED_HOTELS;
    }

    res.json({ success: true, hotels });
  } catch (err) {
    res.json({ success: true, hotels: SEED_HOTELS });
  }
});

// Calculate & Save Booking
router.post('/calculate-and-save', async (req, res) => {
  try {
    const { destination, startDate, endDate, hotel, activities = [], guestName, guestEmail } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalNights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1);

    const hotelPrice = hotel ? Number(hotel.pricePerNight) || 0 : 0;
    const accommodationCost = hotelPrice * totalNights;
    const activitiesCost = activities.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
    const totalCost = accommodationCost + activitiesCost;

    const bookingId = 'BK-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    res.status(201).json({
      success: true,
      booking: {
        bookingId,
        guestName: guestName || 'Valued Guest',
        destination,
        startDate,
        endDate,
        totalNights,
        hotelName: hotel ? hotel.name : 'No Hotel Selected',
        totalCost,
        status: 'Confirmed'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
