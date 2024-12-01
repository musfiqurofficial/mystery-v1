import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
