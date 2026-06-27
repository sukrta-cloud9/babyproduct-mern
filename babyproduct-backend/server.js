const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");


server.use(express.json());
server.use(cors());

mongoose.connect("mongodb+srv://sukrta:mern54321@mern-cluster.zlol5zf.mongodb.net/babyproduct_backend?appName=mern-cluster").then(()=>
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






server.listen(5000, ()=>{
    console.log("Server running at 5000");
});