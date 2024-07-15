const jwt = require('jsonwebtoken');
const User_Model = require('../models/User-Model') 
// Middleware to verify to protect routes from malicious file

module.exports = async (req,res,next)=>{
    if(!req.cookies.token || req.cookies.token === undefined || req.cookies.token === null || req.cookies.token === ""){
        req.flash("error", "You must Login First!");
        return res.redirect('/users/login');
    }
    try{
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await User_Model
        .findOne({ Email : decoded.email })
        .select("-password");
        req.user = user;
        next();
    }catch(error) {
        req.flash("error", "Something went Wrong!");
        res.clearCookie("token");
        return res.redirect('/users/login');
    }
}