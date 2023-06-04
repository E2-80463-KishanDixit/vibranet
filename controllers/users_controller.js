module.exports.profile = function(req,res){
     // res.end('<h1>User Profile</h1>');

     res.render('users',{
          title: 'Users Profile'
     })
}

//rendering sign up page
module.exports.signUp = function(req,res){

     return res.render('user_sign_up',{
         title:"Vibranet | SignUp Page"
     });
 }

// rendering sign in paage
module.exports.signIn = function(req,res){
    
     return res.render('user_sign_in',{
         title:"Vibranet | SignIn Page"
     });
 }

