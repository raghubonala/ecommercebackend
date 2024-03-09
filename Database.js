const mongoose = require('mongoose');
const Database = () =>{
    mongoose.connect(process.env.MONGOURL).then(()=>{
        console.log("connected");
    }).catch(()=>{
        console.log("disconnected");
    })
}

module.exports = Database

