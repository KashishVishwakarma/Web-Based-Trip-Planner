import React, { createContext, useContext, useState, useMemo } from 'react';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [destination, setDestination] = useState('Paris, France');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-06');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [activities, setActivities] = useState([
    { id: 1, name: 'City Museum Tour', cost: 45 }
  ]);

  const nights = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [startDate, endDate]);

  const hotelTotal = useMemo(() => {
    return selectedHotel ? selectedHotel.pricePerNight * nights : 0;
  }, [selectedHotel, nights]);

  const activitiesTotal = useMemo(() => {
    return activities.reduce((sum, item) => sum + Number(item.cost), 0);
  }, [activities]);

  const grandTotal = hotelTotal + activitiesTotal;

  return (
    <TripContext.Provider value={{
      destination, setDestination,
      startDate, setStartDate,
      endDate, setEndDate,
      selectedHotel, setSelectedHotel,
      activities, setActivities,
      nights,
      hotelTotal,
      activitiesTotal,
      grandTotal
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
