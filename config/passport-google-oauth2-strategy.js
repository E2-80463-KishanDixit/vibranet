const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login 
passport.use(new googleStrategy({
    clientID: "478209965514-tcqv1d49qspmpte14j8d2vecia9aihps.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
// Profile will conatin user information 
// accessToken ==> it is to sign up
// refreshToken ==> if token is expire then this will generate a new fresh Token
function(accessToken,refreshToken,profile,done){ 

    //find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('Error in google strategy passport',err); return};
        console.log(accessToken,refreshToken)
        console.log(profile);

        //if user found then ===> set this user as req.user
        if(user){
            done(null,user);
        }else{
            // if user not found ===> then create user and set it as 
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },
            function(err,user){
                if(err){console.log('Error in creating user google strategy passport',err); return};

                return done(null,user);
            })
        }
    })
}
))