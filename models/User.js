const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        minlegth:3,
        maxlength:50,
        trim:true,
        required:[true,'Please Enter Name!!']
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:[true,'Email already exists'],
        required:[true,'Please Enter Email!!'],
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please Enter vaild email!!'],

    },
    password:{
        type:String,
        required:[true,'Please Enter Password!!'],
        select:false,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,"Password should be atleast one upper alphabet,one number,one special symbol and min length is 8"]
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{timestamps:true});

const User = mongoose.model('User',UserSchema);

module.exports = User;