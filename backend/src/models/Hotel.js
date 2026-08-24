import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, default: 4.5 },
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' }
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);
