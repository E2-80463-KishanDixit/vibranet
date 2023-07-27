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
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleWare = require('./config/middleware'); 

app.use(sassMiddleware({
    src:'./assets/scss',                 // link to where SCSS file take and compile it into CSS
    dest:'./assets/css',                 // where we put all the css file
    debug:true,                         // to find all the errors in the terminal
    outputStyle: 'extended',             // to see a under standable format not in one line
    prefix: '/css'
}))

// // to read form data
// app.use(express.urlencoded());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


// to use cookie
app.use(cookieParser());


//adding static files 
app.use(express.static('./assets'));

// making the uploads path available to the browser
app.use('/uploads',express.static(__dirname +'/uploads'));

// using layouts
app.use(expressLayout);


// extracts css and js from the layout 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//set the session 
//Mongo store is used to store session cookie in the db
app.use(session({
    name:'vibranet',
    // TODO change the secret key before deployment in production mode
    secret:"mysecret",
    saveUninitialized:false, 
    resave:false,                // do not want to save data again and again
    cookie:{
        maxAge: (1000 *60 *100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//setting up flash messages
app.use(flash());
app.use(customMiddleWare.setFlash);

// use express router 
app.use('/',require('./routes'));




app.listen(port,(err)=>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running at port: ${port}`);
});