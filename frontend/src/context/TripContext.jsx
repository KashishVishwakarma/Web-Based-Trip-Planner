import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [destination, setDestination] = useState('Paris, France');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-06');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [activities, setActivities] = useState([
    { id: 1, name: 'Museum Pass & Guided Tour', cost: 65 },
    { id: 2, name: 'Seine River Sunset Cruise', cost: 35 }
  ]);
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);

  // Fetch hotels from backend API
  useEffect(() => {
    fetch('/api/hotels')
      .then((res) => res.json())
      .then((data) => {
        if (data.hotels) {
          setHotels(data.hotels);
          if (data.hotels.length > 0) setSelectedHotel(data.hotels[0]);
        }
      })
      .catch((err) => console.error('Error fetching hotels:', err))
      .finally(() => setLoadingHotels(false));
  }, []);

  const totalNights = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [startDate, endDate]);

  const hotelTotal = useMemo(() => {
    return selectedHotel ? selectedHotel.pricePerNight * totalNights : 0;
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
      destination, setDestination,
      startDate, setStartDate,
      endDate, setEndDate,
      hotels, loadingHotels,
      selectedHotel, setSelectedHotel,
      activities, addActivity, removeActivity,
      totalNights, hotelTotal, activitiesTotal, grandTotal
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
