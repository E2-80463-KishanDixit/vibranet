const express = require('express');
const cookieParser = require('cookie-parser'); // To use cookie 
port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
// adding monggose 
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require("passport");
const passportLocal = require('./config/passport-local-strategy')


// // to read form data
// app.use(express.urlencoded());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


// to use cookie
app.use(cookieParser());


//adding static files 
app.use(express.static('./assets'));

// using layouts
app.use(expressLayout);


// extracts css and js from the layout 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// set the session 
app.use(session({
    name:'vibranet',
    // TODO change the secret key before deployment in production mode
    secret:"mysecret",
    saveUninitialized:false, 
    resave:false,                // do not want to save data again and again
    cookie:{
        maxAge: (1000 *60 *100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router 
app.use('/',require('./routes'));




app.listen(port,(err)=>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running at port: ${port}`);
});