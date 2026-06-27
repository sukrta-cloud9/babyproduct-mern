const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt= require("bcryptjs");
const jwt =require("jsonwebtoken");

router.get("/", async(req,res)=>
{
    try
    {
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        console.log(err);
    }
}
);
router.post("/register", async (req,res)=>
{
    try{
        const {name, email, password} = req.body;
       const existingUser = await User.findOne({email});
       if(existingUser){
        return res.json({message:"Email already exists"})
       }
       const hashedPassword = await bcrypt.hash(password, 10)
       const newUser = new User({
        name,
        email,
        password :hashedPassword
       });

       const savedUser = await newUser.save();
       res.json(savedUser);

    }
    catch(err)
    {
        console.log(err);
    }
});

router.post("/login", async(req,res)=>
{
    try
    {
        const {email,password}= req.body;
        console.log("Email received", email);
        const user = await User.findOne({email})
        if(!user)  
        {
            return res.json({message:"user not found"});
        }
       const result = await bcrypt.compare(password, user.password)
       if(!result)
       {
        return res.json({message: "Wrong password"});
       }
       const token = jwt.sign({id :user._id,role: user.role}, process.env.JWT_SECRET)
       res.json({
        message:"Login successfull",
        token, user
       });

    }
    catch(err)
    {
        console.log(err);
    }
});

router.patch("/:id", async(req,res)=>
{ try
    {
        const user = await User.findById(req.params.id)
        user.active = !user.active
        const updatedUser = await user.save();
        res.json(updatedUser);
    }
    catch(err)
    {
        console.log(err);
    }
   
});
router.delete("/:id", async(req,res)=>
{
    try
    {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json(deletedUser);
    }
    catch(err){
        console.log(err);
    }
});
module.exports = router;