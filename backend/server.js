require('dotenv').config();
const express = require('express')
const app = express();
const db = require('./db');
const cors = require('cors'); 

app.use(cors({
    origin: ["https://daily-tracker-eight-iota.vercel.app","http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userRoutes = require('././routes/UserRoutes')
app.use('/user', userRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})