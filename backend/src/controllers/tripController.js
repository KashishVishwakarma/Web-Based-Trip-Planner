import Trip from '../models/Trip.js';
import Hotel from '../models/Hotel.js';

export const createTrip = async (req, res) => {
  try {
    const { userId, title, destination, startDate, endDate, hotelId, activities = [] } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

    let accommodationCost = 0;
    if (hotelId) {
      const hotel = await Hotel.findById(hotelId);
      if (hotel) accommodationCost = hotel.pricePerNight * nights;
    }

    const activitiesCost = activities.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
    const totalEstimatedCost = accommodationCost + activitiesCost;

    const newTrip = await Trip.create({
      userId,
      title,
      destination,
      startDate: start,
      endDate: end,
      selectedHotel: hotelId || null,
      activities,
      totalEstimatedCost
    });

    res.status(201).json({ success: true, trip: newTrip });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
