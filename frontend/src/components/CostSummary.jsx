import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

export default function CostSummary() {
  const {
    destination,
    startDate,
    endDate,
    selectedHotel,
    activities,
    totalNights,
    hotelTotal,
    activitiesTotal,
    grandTotal
  } = useTrip();

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveTrip = async () => {
    setSaving(true);
    setSuccessMessage('');
    try {
      const response = await fetch('/api/calculate-and-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          hotelId: selectedHotel?._id,
          activities
        })
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('✓ Trip saved successfully to database!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl sticky top-8 border border-slate-800">
      <h2 className="text-xl font-bold tracking-tight border-b border-slate-800 pb-4">
        Live Cost Summary
      </h2>

      <div className="space-y-3.5 my-6 text-sm">
        <div className="flex justify-between items-center text-slate-300">
          <span className="text-slate-400">Destination</span>
          <span className="font-semibold text-white">{destination}</span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span className="text-slate-400">Duration</span>
          <span className="font-semibold text-white">{totalNights} Night(s)</span>
        </div>

        <div className="flex justify-between items-center border-t border-slate-800 pt-3">
          <span className="text-slate-400">
            Hotel {selectedHotel ? `(${selectedHotel.name})` : ''}
          </span>
          <span className="font-semibold text-white">${hotelTotal}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400">Selected Activities ({activities.length})</span>
          <span className="font-semibold text-white">${activitiesTotal}</span>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-4 flex items-baseline justify-between">
        <span className="text-slate-300 font-medium text-sm">Total Estimated Trip Cost</span>
        <span className="text-3xl font-black text-emerald-400">${grandTotal}</span>
      </div>

      <button
        onClick={handleSaveTrip}
        disabled={saving}
        className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-2xl transition shadow-lg shadow-emerald-500/20 text-sm"
      >
        {saving ? 'Saving...' : 'Book & Save Itinerary'}
      </button>

      {successMessage && (
        <p className="mt-3 text-center text-xs font-semibold text-emerald-400">
          {successMessage}
        </p>
      )}
    </div>
  );
}
