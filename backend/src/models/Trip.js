import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  selectedHotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', default: null },
  activities: [{
    name: { type: String, required: true },
    cost: { type: Number, required: true, default: 0 }
  }],
  totalEstimatedCost: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Trip', tripSchema);
