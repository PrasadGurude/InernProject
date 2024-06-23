const mongoose = require('mongoose')

let insertDataSchema = mongoose.Schema({
    id: {
        type:Number,
        required:true
    },
    title: {
        type:String,
        required:true
    } ,
    price: {
        type:Number,
        required:true
    } ,
    description: {
        type:String,
        required:true
    } ,
    category: {
        type:String,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    sold: {
        type:Boolean,
        required:true
    },
    dateOfSale:{
        type:String,
        required:true
    }
})

const insertDataModel = mongoose.model("salesData" , insertDataSchema)

module.exports = insertDataModel;