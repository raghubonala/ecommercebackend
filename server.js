const express = require('express');
const Database = require("./Database")
const Product = require("./model/Product");
const Cart = require("./model/Cart")
const cors = require("cors")
const env = require('dotenv');


const app = express()
env.config();

const port = process.env.PORT || 4000;

Database()

// ---------------------------------------------------------------------

let ssdh = [{ name: "sumit", age: 20 }, { name: "rahesh", age: 30 }, { name: "ankesh", age: 40 }]

ssdh.map((doc) => {
  console.log(doc.name)
  console.log(doc.age)

})


// ========================================================================

app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello hellllo')
})

/// start add prduct ki api hai

app.post("/add_product", (req, res) => {
  Product.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  })
  res.json("product_Added")
})

/// End add prduct ki api hai


app.get("/show_product", async (req, res) => {
  try {
    const data = await Product.find()
    res.json(data)
  } catch (error) {
    res.json("error")
  }
})
app.get("/single_product/:id", async (req, res) => {
  try {
    const data = await Product.findById({ _id: req.params.id })
    res.json(data)
  } catch (error) {
    res.json("error")
  }
})

app.delete("/single_product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete({ _id: req.params.id })
    res.json({ message: "Deleted Product" })
  } catch (error) {
    res.json("error")
  }
})

app.put("/single_product/:id", async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.json(data)
  } catch (error) {
    res.json("error")
  }
})


app.post("/cart", async (req, res) => {
  try {
      const { id, name, price, image } = req.body;

      // Check if the product already exists in the cart
      const existingCartItem = await Cart.findOne({ product: id });

      if (existingCartItem) {
          // If it exists, update the quantity
          existingCartItem.quantity += 1;
          await existingCartItem.save();
          res.json({ message: "Added to cart" });
      } else {
          // If it doesn't exist, create a new cart item
          await Cart.create({
              product: id,
              name: name,
              price: price,
              image: image
          });
          res.json({ message: "Added to cart" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/cart",async(req,res)=>{
  try {
    const order = await Cart.find()
    res.json(order)
  } catch (error) {
    res.json("error")
  }
})



app.listen(port, () => {
  console.log("start");
})