// we use index ----> to listdown something 
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index =async  function(req,res){
    let posts = await Post.find({})
    .sort('-createdAt')  // to display posts in reverse cronological order or first show most recent post after that accroding to time
    .populate('user')
    .populate({
       path:'comments',
       populate:{
           path:'user'
       }
    });

    return res.status(200).json({
        message:"List of Posts",
        posts:posts
    })
}

module.exports.delete =async function(req,res){
    try{
        let post =  await Post.findById(req.params.id);

        // .id means converting the Object id into string
 
        // if(post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post:req.params.id});

            return  res.status(200).json({
                message:"Post and associated comments deleted successfully"
            })
        // }else{
        //     req.flash('error',"You can't delete this post");
        //     return  res.redirect('back');
        // }

    }catch(err){
        console.log("****** Error:",err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
    // First we have to find the post in database
}