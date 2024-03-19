const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    name: String,
    quantity:{
        type:Number,
        default:1
    },
    image: String,
    price: String
});

module.exports = mongoose.model("Cart", cartSchema);
