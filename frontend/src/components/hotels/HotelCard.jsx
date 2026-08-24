import React from 'react';
import { useTrip } from '../../context/TripContext';

export default function HotelCard({ hotel }) {
  const { selectedHotel, setSelectedHotel } = useTrip();
  const isSelected = selectedHotel?._id === hotel._id;

  return (
    <div className={`border rounded-xl p-4 flex flex-col justify-between transition shadow-sm bg-white ${
      isSelected ? 'border-indigo-600 ring-2 ring-indigo-500' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div>
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name} 
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-800">{hotel.name}</h3>
          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-md font-medium">
            ★ {hotel.rating}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1">{hotel.location}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold text-gray-900">${hotel.pricePerNight}</span>
          <span className="text-xs text-gray-500"> / night</span>
        </div>
        <button
          onClick={() => setSelectedHotel(hotel)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            isSelected 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'Selected' : 'Choose Hotel'}
        </button>
      </div>
    </div>
  );
}
