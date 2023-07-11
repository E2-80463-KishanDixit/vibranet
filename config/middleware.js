module.exports.setFlash=function(req, res, next)
{
    res.locals.flash=
    {
        "success": req.flash("success"),
        "error": req.flash("error")
    }

    next();    // it will send to res to next middleware or to the next response
}