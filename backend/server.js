const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const cors = require('cors'); 

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})