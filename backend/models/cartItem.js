const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("CartItem", CartItemSchema);
