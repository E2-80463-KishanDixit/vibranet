{
    //method to submit form data for new post using AJAX

    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault(); // preventing default behaviour of form 
            // now we send it manualy
            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(),  // to conver data into JSON format
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            <small>
              <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
            </small>

          ${post.content}  
          <br />
            <small>
            ${post.user.name}  
            </small>
        </p>
        <div id="post-comments">

                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add Comment">
                    <!------ TO IDENTIFY AT WHICH POST USER HAVE COMMENTED --------->
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>

            <div id="post-comments-list">
              <ul id="post-comments-${post._id}"></ul>
            </div>
        </div>
        </li>`)
    }



    createPost();
}