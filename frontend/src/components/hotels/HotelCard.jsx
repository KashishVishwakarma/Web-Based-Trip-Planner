import React from 'react';
import { useTrip } from '../context/TripContext';

export default function HotelCard({ hotel }) {
  const { selectedHotel, setSelectedHotel } = useTrip();
  const isSelected = selectedHotel?._id === hotel._id;

  return (
    <div className={`flex flex-col justify-between border rounded-2xl p-4 bg-white transition-all shadow-sm ${
      isSelected ? 'border-indigo-600 ring-2 ring-indigo-500 shadow-md' : 'border-slate-200 hover:border-slate-300'
    }`}>
      <div>
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-44 object-cover rounded-xl mb-3.5"
        />
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-slate-800 text-lg leading-snug">{hotel.name}</h3>
          <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-2 py-1 rounded-md border border-amber-200">
            ★ {hotel.rating}
          </span>
        </div>
        <p className="text-slate-500 text-sm mt-1">{hotel.location}</p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xl font-black text-slate-900">${hotel.pricePerNight}</span>
          <span className="text-xs text-slate-500 font-medium"> / night</span>
        </div>
        <button
          type="button"
          onClick={() => setSelectedHotel(hotel)}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition ${
            isSelected
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
    </div>
  );
}
