const express = require("express");
const router = express.Router();

const Cart = require("../models/cartSchema");

router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existingItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += 1;

      const updatedItem = await existingItem.save();

      return res.json(updatedItem);
    }

    const newCartItem = new Cart({
      user: userId,
      product: productId,
      quantity: 1,
    });

    const savedCartItem = await newCartItem.save();

    res.json(savedCartItem);

  } catch (err) {
    console.log(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {

    const cartItems = await Cart.find({
      user: req.params.userId,
    }).populate("product");

    res.json(cartItems);

  } catch (err) {
    console.log(err);
  }
});
router.patch("/:id", async (req, res) => {
  try {

    const cartItem = await Cart.findById(req.params.id);

    cartItem.quantity = req.body.quantity;

    const updatedItem = await cartItem.save();

    res.json(updatedItem);

  } catch (err) {
    console.log(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {

    const deletedItem = await Cart.findByIdAndDelete(req.params.id);

    res.json(deletedItem);

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;