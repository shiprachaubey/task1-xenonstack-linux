const express = require("express")

const router = express.Router();

const {handleSignup, handleLogin, handleLogout} = require("../controllers/userController");
// const { isLoggedIn } = require("../middlewares/user");

router.route("/signup").post(handleSignup)
router.route("/login").post(handleLogin)
router.route("/logout").get(handleLogout)


module.exports=router