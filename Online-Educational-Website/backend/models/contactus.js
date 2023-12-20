
const mongoose = require('mongoose');


const contactUsSchema =new  mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        unique:true
    },
    comment:{
        type:String,
        required:[true,'Please provide comment'],
        required:true
    },
},{timestamps:true})

const ContactUs = mongoose.model("contactus",contactUsSchema)

module.exports = ContactUs