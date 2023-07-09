const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function(req,res){
    Post.create({
        content:req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log('Error in creating a Post');
            return;
        }
        return res.redirect('back');
    });
}

// TO DELETE  A POST 

module.exports.delete = function(req,res){
    // First we have to find the post in database
    Post.findById(req.params.id, function(err,post){
        // .id means converting the Object id into string

        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                return  res.redirect('back');
            });
        }
    });
}