const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content:req.body.content,
            user: req.user._id
        });
        req.flash('success',"Post published!");
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

// TO DELETE  A POST 

module.exports.delete =async function(req,res){
    try{
        let post =  await Post.findById(req.params.id);

        // .id means converting the Object id into string
 
        if(post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post:req.params.id});
            req.flash('success',"Post deleted with all associated comments");
            return  res.redirect('back')
        }else{
            req.flash('error',"You can't delete this post");
            return  res.redirect('back');
        }

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    // First we have to find the post in database
}