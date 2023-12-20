const Contact = require("../models/contactus");

async function handleUplpoadContact(req,res)
{

    const {firstname,lastname,email,comment} = req.body;
    const contactInfo  = await Contact.create({
        firstname,
        lastname,
        email,
        comment
    })

    return res.status(200),json({success:false,msg:"Contact us info uploaded"})
}   


module.exports={
    handleUplpoadContact
}