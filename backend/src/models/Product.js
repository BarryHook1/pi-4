const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  typeCategory: { type: String, required: true },
  typePart: { type: String, required: true },
  stock: { type: Number, required: true },
  carBrand: { type: String, required: true },
  carModel: { type: String, required: true },
  yearFrom: { type: Number, required: true },
  yearTo: { type: Number, required: true },
  condition: { type: String, required: true },
  description: { type: String, maxLength: 200 },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
});

module.exports = mongoose.model("Product", productSchema);
