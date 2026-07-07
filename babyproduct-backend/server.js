const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

server.use(express.json());
server.use(cors());

server.use("/uploads", express.static(path.join(__dirname, "uploads")));
server.use("/wishlist", wishlistRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>
{
    console.log("MongoDB connected")
}).catch((err)=>{
    console.log(err)
});
server.get("/", (req,res)=>{
res.send("Home page");
});

server.use("/products",productRoutes);
server.use("/users", userRoutes);
server.use("/cart", cartRoutes);






server.listen(5000, ()=>{
    console.log("Server running at 5000");
});