var express 	= require("express");
var router 		= express.Router();
var passport 	= require("passport");
var User		= require("../models/user");
var middleware 	= require("../middleware");
var Wynik 		= require("../models/wynik");
var async 		= require("async");
var nodemailer  = require("nodemailer");
var crypto		= require("crypto");
const { nextTick } = require("process");
require("dotenv").config();
// const user = require("../models/user");
// const { exists } = require("../models/user");




// ta sciezka pokazuje strone startowa
router.get("/", function(req,res){
	// res.render odda uzytkownikowi plik ktรณry wpiszemy
	res.render("index");
});

// 	// sign logic
router.get("/register", function(req, res){
	res.render("users/register")
});

router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
		avatar: req.body.avatar,
		nick: req.body.nick
      });

    if(req.body.adminCode === process.env.BOSS) {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("users/register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
			req.flash("success", "Successfully Signed Up! Are you ready for Battle? " + user.username);
           	res.redirect("/wynik"); 
        });
    });
});




// LOGIN ROUTES
router.get("/login", function(req, res){
	res.render("users/login")
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

// forgot password
router.get('/forgot', function(req, res) {
	res.render('users/forgot');
  });
  
router.post('/forgot', function(req, res, next) {
	async.waterfall([
	  function(done) {
		crypto.randomBytes(20, function(err, buf) {
		  var token = buf.toString('hex');
		  done(err, token);
		});
	  },
	  function(token, done) {
		User.findOne({ email: req.body.email }, function(err, user) {
		  if (!user) {
			req.flash('error', 'No account with that email address exists.');
			return res.redirect('/forgot');
		  }
  
		  user.resetPasswordToken = token;
		  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
		  user.save(function(err) {
			done(err, token, user);
		  });
		});
	  },
	  function(token, user, done) {
		var smtpTransport = nodemailer.createTransport({
		  service: 'Gmail', 
		  auth: {
			user: 'yusarebel@gmail.com',
			pass: process.env.GMAILPW
		  }
		});
		var mailOptions = {
		  to: user.email,
		  from: 'yusarebel@gmail.com',
		  subject: 'Node.js Password Reset',
		  text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
			'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
			'http://' + req.headers.host + '/reset/' + token + '\n\n' +
			'If you did not request this, please ignore this email and your password will remain unchanged.\n'
		};
		smtpTransport.sendMail(mailOptions, function(err) {
		  console.log('mail sent');
		  req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
		  done(err, 'done');
		});
	  }
	], function(err) {
	  if (err) return next(err);
	  res.redirect('/forgot');
	});
  });
  
  router.get('/reset/:token', function(req, res) {
	User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
	  if (!user) {
		req.flash('error', 'Password reset token is invalid or has expired.');
		return res.redirect('/forgot');
	  }
	  res.render('users/reset', {token: req.params.token});
	});
  });
  
  router.post('/reset/:token', function(req, res) {
	async.waterfall([
	  function(done) {
		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		  if (!user) {
			req.flash('error', 'Password reset token is invalid or has expired.');
			return res.redirect('back');
		  }
		  if(req.body.password === req.body.confirm) {
			user.setPassword(req.body.password, function(err) {
			  user.resetPasswordToken = undefined;
			  user.resetPasswordExpires = undefined;
  
			  user.save(function(err) {
				req.logIn(user, function(err) {
				  done(err, user);
				});
			  });
			})
		  } else {
			  req.flash("error", "Passwords do not match.");
			  return res.redirect('back');
		  }
		});
	  },
	  function(user, done) {
		var smtpTransport = nodemailer.createTransport({
		  service: 'Gmail', 
		  auth: {
			user: 'yusarebel@gmail.com',
			pass: process.env.GMAILPW
		  }
		});
		var mailOptions = {
		  to: user.email,
		  from: 'lyusarebel@mail.com',
		  subject: 'Your password has been changed',
		  text: 'Hello,\n\n' +
			'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
		};
		smtpTransport.sendMail(mailOptions, function(err) {
		  req.flash('success', 'Success! Your password has been changed.');
		  done(err);
		});
	  }
	], function(err) {
	  res.redirect('/wynik');
	});
});




router.get("/users/:id", function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			 req.flash("error", "Somthing went wrong.")
			 res.redirect("/")
		}
		Wynik.find().where('author.id').equals(foundUser._id).exec(function(err, wyniki){
			if(err){
				req.flash("error", "Somthing went wrong.")
				res.redirect("/")
			}
			res.render("users/show", {user: foundUser, wyniki: wyniki});
		});
	});
});




module.exports = router;