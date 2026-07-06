const express = require("express");
const router = express.Router();

const Product = require("../models/productSchema");
const upload = require("../middleware/upload.js");

router.post("/",upload.single("image"), async(req,res)=>
{
    try
    {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

       const newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: "/uploads/" + req.file.filename,
    description: req.body.description,
    rating: req.body.rating,
    offer: req.body.offer,
});
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
        message: "Error adding product"
    });
    }

});
router.get("/", async (req,res)=>
{
  try
    {
       const products = await Product.find();
       res.json(products);
    }
    catch(err)
    {
        console.log(err);
    }
});
router.get("/:id", async(req,res)=>
{  try
    {
    const product = await Product.findById(req.params.id);
    res.json(product);
    }
    catch(err)
    {
        console.log(err);
    }
});
router.patch("/:id", async(req,res)=>
{
    try 
    {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id , req.body, {new : true})
        res.json(updatedProduct);
    }
    catch(err)
    {
        console.log(err);
    }
});
router.delete("/:id", async (req,res)=>
{
    try
    {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.json(deletedProduct);
    }
    catch(err)
    {
        console.log(err);
    }
});
module.exports = router;