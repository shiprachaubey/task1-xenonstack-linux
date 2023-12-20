const express = require("express")

const router = express.Router();

const {handleUplpoadContact} = require("../controllers/contactController");
// const { isLoggedIn } = require("../middlewares/user");

router.route("/contact").post(handleUplpoadContact)



module.exports=router