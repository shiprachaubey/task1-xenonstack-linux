const User = require("../models/user")
const { verifyJwtToken } = require("../utils/JwtTokenService");

async function isLoggedIn(req,res,next)
{
    const token = req.cookies.token;
    
    if(!token)
    {
        return res.status(300).json({success:false,msg:"Log in to access this page"});
    }

    const decoded = verifyJwtToken(token);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
}

module.exports={
    isLoggedIn
}