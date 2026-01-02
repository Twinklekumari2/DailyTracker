const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const calendarSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    Jan:{
        type: Number,
        default: 0,
    },
    Feb:{
        type: Number,
        default: 0,
    },
    Mar:{
        type: Number,
        default: 0,
    },
    Apr:{
        type: Number,
        default: 0,
    },
    May:{
        type: Number,
        default: 0,
    },
    Jun:{
        type: Number,
        default: 0,
    },
    Jul:{
        type: Number,
        default: 0,
    },
    Aug:{
        type: Number,
        default: 0,
    },
    Sep:{
        type: Number,
        default: 0,
    },
    Oct:{
        type: Number,
        default: 0,
    },
    Nov:{
        type: Number,
        default: 0,
    },
    Dec:{
        type: Number,
        default: 0,
    },

})
const Calendar = mongoose.model('calendar', calendarSchema);
module.exports = Calendar;