const express = require("express");
const router = express.Router();
const PersonSchema = require("../models/user");
const bcryptjs = require("bcryptjs");

router.post("/", async function(req, res){
    try{
        let data = req.body.data;
        let password = data.passwordRegister
        
        const validateSymbol = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
        const validateLength = password.length >= 8
        const validateNumber = /[0-9]/.test(password)
        
        if(validateSymbol && validateLength && validateNumber){
           let secretPassword = await bcryptjs.hash(password, 10);
           await PersonSchema.create({
            username: data.usernameRegister,
            email: data.emailRegister,
            password: secretPassword,
           })
           return res.json({status: 'succes'})
        }
        
        if(!validateSymbol) throw "password must contain the symbol"
        if(!validateLength) throw "password length must be more than 8 and less than 16"
        if(!validateNumber) throw "password must contain number"
        
        if(!validateNumber && !validateLength && !validateNumber) throw "password must be more than 8 and less than 16, have a number and character"

    }catch(err){
        return res.json({status: 'error', message: err})
    }
})

module.exports = router;
