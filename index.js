const express = require('express');
const app = express();
port = 8000;

// use express router 
app.use('/',require('./routes'));




app.listen(port,(err)=>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running at port: ${port}`);
})