const express = require("express");
const router = express.Router();
const userData = require("../models/user");

router.get('/:id', async function(req, res){
    const userID = req.params.id

    userData.findOne({_id: userID}, ["username", "profileUrl"], function(err, data) {
        return res.json({ name: data.username, photoProfile: data.profileUrl })
    })
})

module.exports = router