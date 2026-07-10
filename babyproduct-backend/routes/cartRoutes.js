const express = require("express");
const router = express.Router();

const Cart = require("../models/cartSchema");

// ================= ADD TO CART =================
router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId are required",
      });
    }

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

    return res.json(savedCartItem);

  } catch (err) {
    console.error("POST /cart:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
});

// ================= GET CART =================
router.get("/:userId", async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.params.userId,
    }).populate("product");

    return res.json(cartItems);

  } catch (err) {
    console.error("GET /cart:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
});

// ================= UPDATE QUANTITY =================
router.patch("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cartItem.quantity = req.body.quantity;

    const updatedItem = await cartItem.save();

    return res.json(updatedItem);

  } catch (err) {
    console.error("PATCH /cart:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
});

// ================= DELETE ITEM =================
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.json(deletedItem);

  } catch (err) {
    console.error("DELETE /cart:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;