const express = require('express');
const Database = require("./Database")
const Product = require("./model/Product");
const cors = require("cors")
const env = require('dotenv');

const app = express()
env.config();

const port = process.env.PORT || 4000;

Database()

app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello hellllo')
})

/// start add prduct ki api hai

app.post("/add_product",(req,res)=>{
  Product.create({
    name:req.body.name,
    description:req.body.description,
    image:req.body.image,
    price:req.body.price,
  })
   res.json("product_Added")
})

/// End add prduct ki api hai


app.get("/show_product",async(req,res)=>{
  try {
    const data = await Product.find()
    res.json(data)
  } catch (error) {
    res.json("error")
  }
})
app.get("/single_product/:id",async(req,res)=>{
  try {
    const data = await Product.findById({_id:req.params.id})
    res.json(data)
  } catch (error) {
    res.json("error")
  }
})

app.delete("/single_product/:id",async(req,res)=>{
  try {
    const data = await Product.findByIdAndDelete({_id:req.params.id})
    res.json(data)
  } catch (error) {
    res.json("error")
  }
})

app.put("/single_product/:id",async(req,res)=>{
  try {
    const data = await Product.findByIdAndUpdate({_id:req.params.id},req.body, { new: true })
    res.json(data)
  } catch (error) {
    res.json("error")
  }
})




app.listen(port,()=>{
    console.log("start");
})