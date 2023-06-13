const User = require('../models/user');

module.exports.profile = function(req,res){
     // res.end('<h1>User Profile</h1>');

     return res.render('users_pro',{
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