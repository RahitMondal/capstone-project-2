const express = require("express");

const controller = require("../controllers/controller");

const router = express.Router();

router.get("/items", controller.getItems);

router.get("/getCartItems", controller.getCartItems);

router.post("/addToCart", controller.addToCart);

router.delete("/removeFromCart", controller.removeFromCart);

router.delete("/emptyCart", controller.emptyCart);

router.get("/:item", controller.getSubItems);

module.exports = router;
