const Post = require('../models/post');

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

     Post.find({}).populate('user').exec(function(err,posts){
            return res.render('home',{
                title: "Vibranet | Home",
                posts:posts,
                // comments:comment
            });
        });
}

// module.exports.actionName = function(){  };