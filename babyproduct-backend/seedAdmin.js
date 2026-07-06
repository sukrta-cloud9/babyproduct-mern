const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/userSchema");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    
    const existingAdmin = await User.findOne({
      email: "admin@babyshop.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    
    const hashedPassword = await bcrypt.hash("admin123", 10);

    
    const admin = new User({
      name: "Admin",
      email: "admin@babyshop.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("Admin Created Successfully!");

    process.exit();
  })
  .catch((err) => console.log(err));