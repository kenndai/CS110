const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    id: {
        type:String,
        required:true
    }
});

module.exports = Item = mongoose.model('room', RoomSchema); 