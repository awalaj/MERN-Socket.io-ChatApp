const express = require('express');
const router =  express.Router();
const multer = require('multer');
const bcryptjs = require("bcryptjs")
const user = require("../models/user")
const fs = require("fs")
const { storagePhotoProfil } = require('../utils/utils');

const stroge = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/profileUser')
    },
    filename: (req, file, cb) => {  
        cb(null, `${req.body['userID']}.png`)
    }
})

const upload = multer({ storage: stroge })

router.put('/', upload.single("imageUpdate"), async function(req, res){
    const { nameUpdate, passwordUpdate, users, userID } = req.body
    const nameImage = `${storagePhotoProfil}${userID}.png`;
    var updatedata = {
        profileUrl: nameImage
    }

    try{
        if(nameUpdate){
            updatedata["username"] = nameUpdate
        }
        if(passwordUpdate){
            updatedata["password"] = await bcryptjs.hash(passwordUpdate, 10);
        }
        await user.findOneAndUpdate({ username: users }, updatedata).exec((err, data)=> {
            return res.json({status: 'ok'})
        })
    }catch(err){
        return res.json({status: 'error'})
    }
})

module.exports = router