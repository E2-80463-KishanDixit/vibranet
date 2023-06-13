const passport = require('passport');

const LocalStrategy  = require('passport-local').Strategy;

const User = require('../models/user');

// // authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'            // we going this email as username and it is unique
},
    // call back function
function(email,password,done){      // here "done" is a function which telss that auth is done or not it may take two arguments
    // find a user and will established an identity
    User.findOne({email:email},function (err,user){                // email(schema Vlaue) : email(Passed value)
        if(err){
            console.log("Error in finding user -----> passport");
            return done(err);                                     // this will report error
        }

        if(!user || user.password != password){
            console.log("Invalid Username/Password");
            return done(null, false);                   //false shows that authentication is not done
        }
        return done(null,user);
    });        
}
));


//serialzing the key it means which key going to set up as a encrypted key for the cookie

passport.serializeUser( function(user,done){
    done(null,user.id);
});

//deserializing the user form the key  in the cookies

passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user -----> passport");
            return done(err); 
        }

        return done(null,user);
    })

})



module.exports = passport;