const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomId:{
        type:String,
        trim:true,
        unique:true,
        required:true,
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    admin:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
    },
    status:{
        enum:["active","readonly","expired"],
        default:"active"
    }

},{timestamps:true});

const Room = mongoose.model('Room',RoomSchema);

module.exports = Room;