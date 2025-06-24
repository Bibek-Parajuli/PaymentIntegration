const mongoose=require('mongoose')

const Product= new mongoose.Schema({
    name :{type : String , require:true},
    price:{type : Number, require: true},
   inStock:{type:Boolean, default: true},
   image:{type: String }
})
