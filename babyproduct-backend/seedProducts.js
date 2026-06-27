const mongoose = require("mongoose");
const Product = require("./models/productSchema");

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://sukrta:mern54321@mern-cluster.zlol5zf.mongodb.net/babyproduct_backend?appName=mern-cluster"
  )
  .then(() => {
    console.log("MongoDB Connected");
    seedProducts();
  })
  .catch((err) => console.log(err));

const products = [
  {
    category: "Infants",
    name: "Soft Cotton Infant Dress",
    price: 599,
    image: "/infantfrock.png",
    description: "Soft Cotton Infant Dress",
    rating: 4.5,
    offer: "10% OFF",
  },
  {
    category: "Infants",
    name: "Feeding Bottle Set",
    price: 399,
    image: "/feedingbottle.png",
    description: "Feeding Bottle Set",
    rating: 4,
  },
  {
    category: "Infants",
    name: "Baby Oils and Lotions",
    price: 490,
    image: "/babyoil.png",
    description: "Baby Oils and Lotions",
    rating: 4,
  },
  {
    category: "Infants",
    name: "Wrappers and Towels",
    price: 699,
    image: "/towel.png",
    description: "Wrappers and Towels",
    rating: 4.5,
  },
  {
    category: "Toddlers",
    name: "Soft Toys",
    price: 799,
    image: "/softtoys.png",
    description: "Soft Toys",
    rating: 4,
  },
  {
    category: "Toddlers",
    name: "Tiny Car",
    price: 1050,
    image: "/toddlerrider.png",
    description: "Tiny Car",
    rating: 4,
  },
  {
    category: "Toddlers",
    name: "Play Books",
    price: 300,
    image: "/toddlerbook.png",
    description: "Play Books",
    rating: 4,
  },
  {
    category: "Toddlers",
    name: "Tees & Frocks",
    price: 599,
    image: "/toddlercloth.png",
    description: "Tees & Frocks",
    rating: 4,
  },
  {
    category: "Kids",
    name: "Shoes",
    price: 699,
    image: "/kidsshoes.png",
    description: "Shoes",
    rating: 3.5,
  },
  {
    category: "Kids",
    name: "Study Table",
    price: 1550,
    image: "/studytable.png",
    description: "Study Table",
    rating: 4.5,
  },
  {
    category: "Kids",
    name: "Wooden Alphabet Board",
    price: 999,
    image: "/alphabetboard.png",
    description: "Wooden Alphabet Board",
    rating: 4,
  },
  {
    category: "Kids",
    name: "Coloring Books and Crayons",
    price: 350,
    image: "/crayonbook.png",
    description: "Coloring Books and Crayons",
    rating: 4,
  },
  {
    category: "Maternity",
    name: "Maternity Nightware",
    price: 899,
    image: "/maternity-nightware.png",
    description: "Maternity Nightware",
    rating: 4,
    offer: "20% OFF",
  },
  {
    category: "Maternity",
    name: "Maternity Pads",
    price: 299,
    image: "/maternity-pads.png",
    description: "Maternity Pads",
    rating: 4,
    offer: "20% OFF",
  },
  {
    category: "Maternity",
    name: "Protein Powder",
    price: 2100,
    image: "/protein-powder.png",
    description: "Protein Powder",
    rating: 4,
    offer: "20% OFF",
  },
  {
    category: "Maternity",
    name: "Vitamins & Minerals Supplement Tablets",
    price: 900,
    image: "/vitamins-minerals.png",
    description: "Vitamins & Minerals Supplement Tablets",
    rating: 4,
    offer: "20% OFF",
  },
];

async function seedProducts() {
  try {
    await Product.insertMany(products);
    console.log("✅ Products Added Successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
}