const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            res.status(422).json({
                message: "Invalid username or password"
            })
        }

        return res.status(200).json({
            message : "Sign in successfull here is your Token, Please keep it safe",
            data : {
                token: jwt.sign(user.toJSON(), 'kishan', {expiresIn: 10000})
            }
        })


    }catch(err){
        console.log("****** Error:",err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
    }