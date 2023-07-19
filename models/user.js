//setting up the user schemma
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
},
{
    timestamp:true
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, paht.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  

const User = mongoose.model('User',userschema);

module.exports = User;