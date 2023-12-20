
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require("crypto")

const userSchema =new  mongoose.Schema({
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
    password:{
        type:String,
        required:[true,'Please provide password'],
        select:false
    },
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,10);

})

userSchema.method('matchPassword',function(clientPassword){
   
    return bcrypt.compare(clientPassword,this.password);
})








const User = mongoose.model('user',userSchema);

module.exports=User;