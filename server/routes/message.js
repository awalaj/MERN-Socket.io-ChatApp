const express = require('express');
const router =  express.Router();
const multer = require('multer');
const messageDB = require("../models/message");
const userDB = require("../models/user");
const { formatDate, strogeImageMessage } = require("../utils/utils")

let fileName = Date.now()

const diskStroge = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images/ImageMessage')
  },
  filename: (req, file, cb) => {
    cb(null, `${fileName}.${file.originalname.toLowerCase().split('.')[1]}`)
  }
})

const upload = multer({ 
  storage: diskStroge,  
  fileFilter: function(req, file, cb){
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}).single("image")

router.put('/', upload, async function(req, res){ 
  const request = req.body
  
  const user = JSON.parse(request.conversation) // get user sender and receiver of conversation
  messageDB.findOneAndUpdate({ conversation: { $all: [user.senderID, user.receiver._id] }}, { $push: { message: { sender: user.sender, text: request.textMessage, timeStamp: formatDate, image: req.file && `${strogeImageMessage}${req.file.filename}`}}}).exec((err, data) => {
      if(data){
        return res.json({ status: "ok" })
      }else{
        return res.json({ status: "error" })
      }
  })
})

module.exports = router