const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    image: String,
    description:String,
    rating: Number,
    offer: String,

    active : {
        type:Boolean,
        default:true,
    }

});
const Product = mongoose.model("Product",productSchema);
module.exports = Product;