import React from 'react';
import { TripProvider } from './context/TripContext';
import HotelCard from './components/hotels/HotelCard';
import CostSummary from './components/trip/CostSummary';

const MOCK_HOTELS = [
  {
    _id: '1',
    name: 'Grand Luxury Palace',
    location: 'Central Paris',
    pricePerNight: 240,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60'
  },
  {
    _id: '2',
    name: 'Boutique Seine View',
    location: 'Seine Riverbanks',
    pricePerNight: 160,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&auto=format&fit=crop&q=60'
  }
];

export default function App() {
  return (
    <TripProvider>
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Choose Your Stay</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_HOTELS.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          </div>
          <div>
            <CostSummary />
          </div>
        </div>
      </main>
    </TripProvider>
  );
}
