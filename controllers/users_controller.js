const User = require('../models/user');

module.exports.profile = function(req,res){
     // res.end('<h1>User Profile</h1>');

     User.findById(req.params.id,function(err,user){
          return res.render('user_profile',{
               title: 'Users Profile',
               profile_user:user
          })
     })
}

//rendering sign up page
module.exports.signUp = function(req,res){
     // if  user is already singed up then it will redirect to profile page
     if(req.isAuthenticated()){
          return res.redirect('/users/profile');
     }

     return res.render('user_sign_up',{
         title:"Vibranet | Sign UP "
     });
 }

// rendering sign in paage
module.exports.signIn = function(req,res){
    // if  user is already singed in then it will redirect to profile page
     if(req.isAuthenticated()){
          return res.redirect('/users/profile');
     }

     return res.render('user_sign_in',{
         title:"Vibranet | Sign In"
     });
 }

//get the form deta 
module.exports.create =async function(req,res){
     
     if(req.body.password != req.body.confirm_password){
          return res.redirect('back');
     }

     try{
          var user = await User.findOne({email:req.body.email});
          if(!user){
               try{
                    await User.create(req.body);
                    return res.redirect('/users/sign-in');
               }catch(err){
                    console.log("Error in creating the user"); 
                    return;
               }
          }else{
               return res.redirect('/users/sign-in');
          }
     }catch(err){
          console.log("Error in finding user in sign up");
               return;
     }
}

// to create session for the user 
module.exports.createSession = function(req,res){
     return res.redirect('/');
} 

module.exports.destroySession = function(req,res,next){
     // before redirecting to home page user should log out
     req.logout(function(err){
          if(err){
               return next(err);
          }
          return res.redirect('/')
     });
}