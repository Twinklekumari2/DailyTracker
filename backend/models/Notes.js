const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const notesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    notes:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Done", "Pending"],
        required:true,
    }
})
const Notes = mongoose.model('notes', notesSchema);
module.exports = Notes;