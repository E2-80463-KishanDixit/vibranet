const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required : true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,        // user object id
        ref: 'User'                                 // Refer to which schema  
    },
    // Include Array of Ids of all comments in this post schema itself
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,        // user object id
            ref: 'Comment'                                 
        }
    ]
},{
    timestamps:true                // it will add "created at and updated add" field in the database
})

const Post = mongoose.model('Post',postSchema);
module.exports = Post;