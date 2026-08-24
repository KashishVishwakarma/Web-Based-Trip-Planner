import React, { useState } from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import HotelCard from './components/hotels/HotelCard';
import CostSummary from './components/trip/CostSummary';

function PlannerContent() {
  const {
    destination, setDestination,
    startDate, setStartDate,
    endDate, setEndDate,
    hotels, loadingHotels,
    activities, addActivity, removeActivity
  } = useTrip();

  const [actName, setActName] = useState('');
  const [actCost, setActCost] = useState('');

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!actName.trim() || !actCost) return;
    addActivity(actName.trim(), Number(actCost));
    setActName('');
    setActCost('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">✈️</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">VoyageCraft</h1>
          </div>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            Render Ready
          </span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Trip Details Form */}
          <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">1. Trip Parameters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3.5 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3.5 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </section>

          {/* Hotel Selection */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">2. Select Your Hotel</h2>
              {loadingHotels && <span className="text-xs text-slate-400">Loading hotels...</span>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hotels && hotels.length > 0 ? (
                hotels.map((h) => (
                  <HotelCard key={h._id} hotel={h} />
                ))
              ) : (
                <p className="text-sm text-slate-500 col-span-2">No hotels found. Connect MongoDB or wait for seeding.</p>
              )}
            </div>
          </section>

          {/* Activity Selection */}
          <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">3. Add Itinerary Activities</h2>
            <form onSubmit={handleAddActivity} className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="Activity / Attraction Name"
                value={actName}
                onChange={(e) => setActName(e.target.value)}
                className="flex-1 px-3.5 py-2 border rounded-xl border-slate-300 text-sm"
              />
              <input
                type="number"
                placeholder="Cost ($)"
                value={actCost}
                onChange={(e) => setActCost(e.target.value)}
                className="w-full sm:w-28 px-3.5 py-2 border rounded-xl border-slate-300 text-sm"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition"
              >
                Add
              </button>
            </form>

            <ul className="divide-y divide-slate-100">
              {activities.map((act) => (
                <li key={act.id} className="py-2.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{act.name}</span>
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-slate-900">${act.cost}</span>
                    <button
                      type="button"
                      onClick={() => removeActivity(act.id)}
                      className="text-rose-500 hover:text-rose-700 font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky Cost Summary */}
        <div className="lg:col-span-1">
          <CostSummary />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <TripProvider>
      <PlannerContent />
    </TripProvider>
  );
}
