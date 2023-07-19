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

module.exports.update = async function(req,res){
     // if(req.user.id == req.params.id){
     //      User.findByIdAndUpdate(req.params.id,req.body, function(err,user){
     //           req.flash('success',"Profile Upadated Successfully");
     //           return res.redirect('back');
     //      })
     // }else{
     //      req.flash('error','Profile not updated');
     //      return res.status(401).send('Unauthorized');
     // }

     if(req.user.id == req.params.id){
          try{
               let user = await User.findById(req.params.id);
               User.uploadedAvatar(req,res,function(err){
                    if(err){
                         console.log("******** Multer Error",err);
                    }
                    user.name = req.body.name;
                    user.email = req.body.email;
                    if(req.file){
                         user.avatar = User.avatarPath+'/'+req.file.filename;
                    }
                    user.save();
                    return res.redirect('back');
               })
          }catch(err){
               req.flash("Error:",err);
               return res.redirect('back');
          }

     }else{
          req.flash('error','Profile not updated');
          return res.status(401).send('Unauthorized');
     }
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
          req.flash('error','Password not Matched');
          return res.redirect('back');
     }

     try{
          var user = await User.findOne({email:req.body.email});
          if(!user){
               try{
                    await User.create(req.body);
                    req.flash('success', 'User Created Scuccessfully');
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
     module.exports.createSession=function(req, res){
     req.flash("success", "logged in successfully");
     return res.redirect("/");
     }


  
  module.exports.destroySession = function(req, res){
     req.logout(function(err) {
        if (err) {        
          req.flash('error',err);
          return res.redirect('back'); }
  
        req.flash("success", "You have successfully Logged out");
        res.redirect('/');
      });
     }