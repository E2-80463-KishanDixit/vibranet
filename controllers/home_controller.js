module.exports.home = function(req,res){
    // Cookie come with browser
    console.log(req.cookies);

    // we can hadle cookie in response
    res.cookie('user_id',25);
    
    return res.render('home',{
        title: "Vibranet title"
    });
}

// module.exports.actionName = function(){  };