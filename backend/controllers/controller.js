const data = require("../data.json");
const CartItem = require("../models/cartItem");

const getItems = (req, res) => {
  const itemsArray = data.results.map((item) => {
    return {
      name: item.name,
      image: item.image,
    };
  });
  res.json({ result: itemsArray });
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find({}, { _id: 0, __v: 0 });
    res
      .status(200)
      .json({ result: { cartItems, itemsCount: cartItems.length } });
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const cartItem = new CartItem(req.body);
    await cartItem.save();
    res.status(201).json({ result: "success" });
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const itemName = req.body.subItem;
  try {
    const cartItem = await CartItem.findOne({ name: itemName });
    await cartItem.remove();
    res.status(200).json({ result: "success" });
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
};

const emptyCart = async (req, res) => {
  try {
    await CartItem.deleteMany();
    res.status(200).json({ result: "success" });
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
};

const getSubItems = (req, res) => {
  const itemName = req.params.item;
  let subItemsArray = [];
  data.results.forEach((item) => {
    if (item.name.toLowerCase() === itemName.toLowerCase()) {
      subItemsArray = item.subItemsData;
    }
  });
  res.json({ result: subItemsArray });
};

module.exports = {
  getItems,
  getCartItems,
  addToCart,
  removeFromCart,
  emptyCart,
  getSubItems,
};
