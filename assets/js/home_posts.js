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
                    console.log(data);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    
    createPost();
}