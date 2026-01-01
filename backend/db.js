const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.DB_URL_LOCAL;
console.log(mongoURL)
mongoose.connect(mongoURL)
const db = mongoose.connection;

db.on('connected',() => {     
    console.log('connected to MongoDB server');
})

db.on('error', (err) => {
    console.log('❌ MongoDB connection error:', err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//export
module.exports = db;