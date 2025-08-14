const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport")
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");

// signup form and signup post route
router.route('/signup')
.get((req,res)=>{
    res.render("users/signup.ejs")
}).post(WrapAsync(userController.signup));



// login post and form route
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
userController.login)

//logout route
router.get("/logout",userController.logout)



module.exports = router;