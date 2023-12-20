const { generateJwtToken } = require("../utils/JwtTokenService");
const User = require("../models/user");
const crypto = require("crypto")
async function handleSignup(req,res){
    try {
        


        const {firstname,lastname,email,password} = req.body;

        if(!email || !firstname || !password)
        {
            return res.status(404).json({success:false,msg:"Name or email or password is not found"});
        }

       const newUser = await User.create({
            firstname,
            lastname,
            email,
            password,
          
        })
        newUser.password = undefined
        const token = generateJwtToken(newUser)

        const options = {
            expires:new Date(
                Date.now()+ 3*24*60*60*1000
            ),
            httpOnly:true
        }

        return res.status(200).cookie('token',token,options).json({success:true,token,newUser,msg:"User created successfully"});

    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,msg:"User not created"});
    }
}


async function handleLogin(req,res){
    const {email,password} = req.body
    if(!email || !password)
    {
        return res.status(404).json({success:false,msg:"Please provide email and password"})
    }

    const user = await User.findOne({email}).select("+password");
    if(!user)
    {
        return res.status(404).json({success:false,msg:"User not found"});
    }
    const isPasswordCorrect =await user.matchPassword(password);
    if(!isPasswordCorrect)
    {
        return res.status(400).json({success:false,msg:"Email or password is incorrect"});
    }
    user.password = undefined
    const token = generateJwtToken(user)

        const options = {
            expires:new Date(
                Date.now()+ 3*24*60*60*1000
            ),
            httpOnly:true
        }

        return res.status(200).cookie('token',token,options).json({success:true,token,user,msg:"Logged in successfully"});
}

async function handleLogout(req,res)
{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    return res.status(200).json({success:true,msg:"Logout success"})
}

module.exports={
    handleSignup,
    handleLogin,
    handleLogout
}