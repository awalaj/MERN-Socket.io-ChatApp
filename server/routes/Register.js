const express = require("express");
const router = express.Router();
const PersonSchema = require("../models/user");
const bcryptjs = require("bcryptjs");

router.post("/", async function(req, res){
    try{
        let data = req.body.data;
        let secretPassword = await bcryptjs.hash(data.passwordRegister, 10);
        
        await PersonSchema.create({
            username: data.usernameRegister,
            email: data.emailRegister,
            password: secretPassword,
        })

        return res.json({status: 'succes'})
    }catch(err){
        return res.json({status: 'error'})
    }
})

module.exports = router;