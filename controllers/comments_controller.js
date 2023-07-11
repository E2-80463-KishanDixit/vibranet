const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create =async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment= await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            // will handle error 
            post.comments.push(comment);
            post.save();                   // have to call this every time whenever we update DB
            req.flash('success',"Comment created successfully!!");
            res.redirect('/');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy =async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            // store post id 
            let postId = comment.post;
            comment.remove();
            req.flash('success',"Comment deleted successfully");
            let post =  Post.findByIdAndUpdate({postId},{$pull: {comments:req.params.id}});
            return res.redirect('back');
        }else{
            req.flash('error',"You can't delete this Comment");
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}