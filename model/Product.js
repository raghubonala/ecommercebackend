const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    name:String,
    description:String,
    image:String,
    price:Number
})


module.exports=mongoose.model("Product",productSchema)