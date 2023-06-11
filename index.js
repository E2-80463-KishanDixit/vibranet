const express = require('express');
const cookieParser = require('cookie-parser'); // To use cookie 
const app = express();
const expressLayout = require('express-ejs-layouts');
port = 8000;

// // to read form data
// app.use(express.urlencoded());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


// to use cookie
app.use(cookieParser());

// adding monggose 
const db = require('./config/mongoose');

// using layouts
app.use(expressLayout);

// extracts css and js from the layout 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router 
app.use('/',require('./routes'));

//adding static files 
app.use(express.static('./assets'));

// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,(err)=>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running at port: ${port}`);
});