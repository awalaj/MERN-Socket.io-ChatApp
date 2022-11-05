const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/', async function(req, res){
    const data = req.body.data;

    await userSchema.findOne({ username: data.usernameLogIn }).select("email").select("photoProfile").select("username").select("password").exec(async function(err, result){
        try{
            if(result){
                const isPasswordValid = await bcryptjs.compare(data.passwordLogIn, result.password)
                if(isPasswordValid){ 
                    return res.json({ status: 'succes', userId: result._id})
                }
            }
            
            if(!result) throw "user not found"
        }catch(err){
            return res.json({ status: 'error', message: err })
        }
    })
})

module.exports = router
