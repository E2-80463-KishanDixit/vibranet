const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = function(req,res){
    // Cookie come with browser
    // console.log(req.cookies);

    // we can hadle cookie in response
    // res.cookie('user_id',25);

    // -------------POPULATE ONLY POST AND USER ID ------------

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Vibranet | Home",
    //         posts:posts
    //     });
    // })

    // ----------- POPULATING USER'S ALL INFO --------------

     Post.find({})
     .populate('user')
     .populate({
        path:'comments',
        populate:{
            path:'user'
        }
     })
     .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                title: "Vibranet | Home",
                posts:posts,
                all_users:users
            });
        })
        });
}

// module.exports.actionName = function(){  };