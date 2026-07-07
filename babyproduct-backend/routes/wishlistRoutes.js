const express = require("express");
const router = express.Router();

const Wishlist = require("../models/wishlistSchema");


// ADD TO WISHLIST
router.post("/", async (req, res) => {
  try {

    const { userId, productId } = req.body;

    const existingItem = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (existingItem) {
      return res.json(existingItem);
    }

    const newWishlist = new Wishlist({
      user: userId,
      product: productId,
    });

    const savedWishlist = await newWishlist.save();

    res.json(savedWishlist);

  } catch (err) {
    console.log(err);
  }
});


// GET USER WISHLIST
router.get("/:userId", async (req, res) => {

  try {

    const wishlist = await Wishlist.find({
      user: req.params.userId,
    }).populate("product");

    res.json(wishlist);

  } catch (err) {
    console.log(err);
  }

});


// REMOVE FROM WISHLIST
router.delete("/:id", async (req, res) => {

  try {

    const deletedItem = await Wishlist.findByIdAndDelete(req.params.id);

    res.json(deletedItem);

  } catch (err) {
    console.log(err);
  }

});

module.exports = router;