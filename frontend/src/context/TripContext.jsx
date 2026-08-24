import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const TripContext = createContext();

const DEFAULT_HOTELS = [
  { _id: 'h1', name: 'Taj Holiday Village Resort', location: 'Goa, India', pricePerNight: 180, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' },
  { _id: 'h2', name: 'Goa Marriott Resort & Spa', location: 'Goa, India', pricePerNight: 140, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500' },
  { _id: 'h3', name: 'Grand Elysée Hotel', location: 'Paris, France', pricePerNight: 220, rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500' },
  { _id: 'h4', name: 'Tokyo Bay Panorama Hotel', location: 'Tokyo, Japan', pricePerNight: 175, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500' }
];

export const TripProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Auth State
  const [destination, setDestination] = useState('Goa, India');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-06');
  const [hotels, setHotels] = useState(DEFAULT_HOTELS);
  const [selectedHotel, setSelectedHotel] = useState(DEFAULT_HOTELS[0]);
  const [activities, setActivities] = useState([
    { id: 1, name: 'Scuba Diving & Water Sports', cost: 45 },
    { id: 2, name: 'Sunset Cruise Dinner', cost: 35 }
  ]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [bookingReceipt, setBookingReceipt] = useState(null);

  // Search hotels when destination changes
  const fetchHotels = async (searchQuery) => {
    setLoadingHotels(true);
    try {
      const res = await fetch(`/api/hotels?location=${encodeURIComponent(searchQuery || '')}`);
      const data = await res.json();
      if (data.hotels && data.hotels.length > 0) {
        setHotels(data.hotels);
        setSelectedHotel(data.hotels[0]);
      } else {
        const filtered = DEFAULT_HOTELS.filter(h => 
          h.location.toLowerCase().includes((searchQuery || '').toLowerCase())
        );
        setHotels(filtered.length > 0 ? filtered : DEFAULT_HOTELS);
        setSelectedHotel(filtered[0] || DEFAULT_HOTELS[0]);
      }
    } catch {
      setHotels(DEFAULT_HOTELS);
      setSelectedHotel(DEFAULT_HOTELS[0]);
    } finally {
      setLoadingHotels(false);
    }
  };

  useEffect(() => {
    fetchHotels(destination);
  }, []);

  const totalNights = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return isNaN(diff) || diff <= 0 ? 1 : diff;
  }, [startDate, endDate]);

  const hotelTotal = useMemo(() => {
    return selectedHotel ? (Number(selectedHotel.pricePerNight) || 0) * totalNights : 0;
  }, [selectedHotel, totalNights]);

  const activitiesTotal = useMemo(() => {
    return activities.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
  }, [activities]);

  const grandTotal = hotelTotal + activitiesTotal;

  const addActivity = (name, cost) => {
    setActivities((prev) => [...prev, { id: Date.now(), name, cost: Number(cost) || 0 }]);
  };

  const removeActivity = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <TripContext.Provider value={{
      user, setUser,
      destination, setDestination,
      startDate, setStartDate,
      endDate, setEndDate,
      hotels, loadingHotels, fetchHotels,
      selectedHotel, setSelectedHotel,
      activities, addActivity, removeActivity,
      totalNights, hotelTotal, activitiesTotal, grandTotal,
      bookingReceipt, setBookingReceipt
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
