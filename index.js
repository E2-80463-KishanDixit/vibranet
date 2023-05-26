const express = require('express');
const app = express();
port = 8000;

// use express router 
app.use('/',require('./routes'));

// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err)=>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running at port: ${port}`);
})