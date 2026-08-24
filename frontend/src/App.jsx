import React, { useState } from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import HotelCard from './components/hotels/HotelCard';
import CostSummary from './components/trip/CostSummary';

function AuthModal({ isOpen, onClose }) {
  const { setUser } = useTrip();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setUser({
      name: name || email.split('@')[0],
      email: email
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold">✕</button>
        <h2 className="text-2xl font-black text-slate-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-sm text-slate-500 mb-6">Access your customized itinerary & discounts.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-2.5 border rounded-xl text-sm border-slate-300 focus:ring-2 focus:ring-indigo-500" />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-2.5 border rounded-xl text-sm border-slate-300 focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 border rounded-xl text-sm border-slate-300 focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition">
            {isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-bold hover:underline">
            {isLogin ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}

function ReceiptModal() {
  const { bookingReceipt, setBookingReceipt } = useTrip();
  if (!bookingReceipt) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative text-slate-900 border border-emerald-100">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-black mb-4">✓</div>
        <h2 className="text-2xl font-black text-slate-900">Trip Confirmed!</h2>
        <p className="text-slate-500 text-sm">Booking ID: <span className="font-mono font-bold text-slate-800">{bookingReceipt.bookingId}</span></p>

        <div className="my-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-slate-500">Guest:</span><span className="font-bold">{bookingReceipt.guestName}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Destination:</span><span className="font-bold">{bookingReceipt.destination}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Stay Duration:</span><span className="font-bold">{bookingReceipt.totalNights} Night(s)</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Hotel:</span><span className="font-bold">{bookingReceipt.hotelName}</span></div>
          <div className="flex justify-between border-t border-slate-200 pt-2"><span className="font-bold">Total Paid:</span><span className="font-black text-emerald-600 text-lg">${bookingReceipt.totalCost}</span></div>
        </div>

        <button onClick={() => setBookingReceipt(null)} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-sm hover:bg-slate-800 transition">
          Close & Plan Another
        </button>
      </div>
    </div>
  );
}

function PlannerContent() {
  const {
    user, setUser,
    destination, setDestination,
    startDate, setStartDate,
    endDate, setEndDate,
    hotels, loadingHotels, fetchHotels,
    activities, addActivity, removeActivity
  } = useTrip();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [actName, setActName] = useState('');
  const [actCost, setActCost] = useState('');

  const handleSearchHotels = (e) => {
    e.preventDefault();
    fetchHotels(destination);
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!actName.trim() || !actCost) return;
    addActivity(actName.trim(), Number(actCost));
    setActName('');
    setActCost('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Dynamic Header with Sign In / Account Buttons */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">✈️</span>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">VoyageCraft</h1>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                  👤 {user.name}
                </span>
                <button
                  onClick={() => setUser(null)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-xl transition shadow-sm"
                >
                  Sign In / Register
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Trip Parameters with Hotel Search trigger */}
          <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">1. Trip Parameters & Destination</h2>
            <form onSubmit={handleSearchHotels} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Destination</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Goa, Paris, Tokyo"
                    className="w-full px-3.5 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                  <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3 rounded-xl">
                    Search
                  </button>
                </div>
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
            </form>
          </section>

          {/* Hotel Selection */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">2. Select Your Hotel</h2>
              {loadingHotels && <span className="text-xs text-indigo-600 font-semibold animate-pulse">Searching hotels...</span>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hotels && hotels.length > 0 ? (
                hotels.map((h) => (
                  <HotelCard key={h._id || h.name} hotel={h} />
                ))
              ) : (
                <p className="text-sm text-slate-500 col-span-2">No hotels found for "{destination}". Showing suggestions.</p>
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
          <CostSummary onOpenAuth={() => setIsAuthOpen(true)} />
        </div>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <ReceiptModal />
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
