const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  image: { type: String },
  description: { type: String },
  category: { type: String },
  currency: { type: String, default: 'NPR' },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Product', ProductSchema);
