const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
port = 8000;

// using layouts
app.use(expressLayout);

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