import React from 'react';
import { useTrip } from '../../context/TripContext';

export default function CostSummary() {
  const { selectedHotel, nights, hotelTotal, activitiesTotal, grandTotal, destination } = useTrip();

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-sm sticky top-6">
      <h2 className="text-xl font-bold border-b border-slate-700 pb-4">Trip Cost Breakdown</h2>
      
      <div className="space-y-4 my-6 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Destination</span>
          <span className="font-medium text-slate-200">{destination}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Duration</span>
          <span className="font-medium text-slate-200">{nights} night(s)</span>
        </div>

        <div className="flex justify-between border-t border-slate-800 pt-3">
          <span className="text-slate-400">
            Hotel {selectedHotel ? `(${selectedHotel.name})` : ''}
          </span>
          <span className="font-medium">${hotelTotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Activities & Tours</span>
          <span className="font-medium">${activitiesTotal}</span>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-4 flex justify-between items-baseline">
        <span className="text-base text-slate-300">Total Estimated Cost</span>
        <span className="text-2xl font-black text-emerald-400">${grandTotal}</span>
      </div>

      <button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 font-semibold py-3 rounded-xl transition text-white">
        Confirm & Book Trip
      </button>
    </div>
  );
}
