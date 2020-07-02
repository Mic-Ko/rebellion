var express 	= require("express");
var router 		= express.Router();
var passport 	= require("passport");
var User		= require("../models/user");
var middleware = require("../middleware")




// ta sciezka pokazuje strone startowa
router.get("/", function(req,res){
	// res.render odda uzytkownikowi plik ktรณry wpiszemy
	res.render("index");
})









// // root route

// router.get("/", function(req, res){
// 	res.render("landing");
// });


// // ====================================?
// // auth routes


router.get("/register", function(req, res){
	res.render("register")
});


	// sign logic
router.post('/register', function(req, res){
	var newUser = new User({username: req.body.username});
	if(req.body.adminCode === "pass5"){
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message)
			return res.redirect("register")
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Successfully Signed Up! Are you ready for Battle? " + user.username)
			res.redirect("/wynik");
		});
	});
});
// LOGIN ROUTES
router.get("/login", function(req, res){
	res.render("login")
});

// login logic, middleware
router.post("/login", passport.authenticate("local",{
	successRedirect:"/wynik",
	failureRedirect:"/login"
}) ,function(req,res){

});

// logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!")
	res.redirect("/wynik");
});




module.exports = router;