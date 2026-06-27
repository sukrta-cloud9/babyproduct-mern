const express = require("express");
const router = express.Router();

const Product = require("../models/productSchema");

router.post("/", async(req,res)=>
{
    try
    {
       const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    }
    catch(err){
        console.log(err);
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