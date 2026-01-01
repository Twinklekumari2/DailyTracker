const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const {generateToken} = require('./../auth');


router.post('/signup', async (req,res) => {
    try{
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is: " , token);

        res.status(200).json({response: response, token: token});
    }catch(err){
        console.log(err)
        res.status(500).json({error: "internal server error"});
    }
})

router.post('/login', async (req, res) => {
    try{
        const {userName, password} = req.body;
        console.log("Login attempt:", userName, password);
        const user = await User.findOne({userName: userName});
        console.log("Login attempt:", userName, password);

        if(!user || !(await user.comparePassword(password))){
            console.log(password, user)
           return res.status(401).json({error: 'Invalid username or password'});
        }
        const payload = {
            id : user.id,
        }
        const token = generateToken(payload);
        console.log("Token is: ", token);
        res.status(200).json({token: token, message:"login successfully"});
    }catch(err){
        res.status(500).json({error: "internal server error"});

    }
})

module.exports = router;