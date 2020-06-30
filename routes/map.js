var express 	= require("express");
var router 		= express.Router();
var passport 	= require("passport");
var User		= require("../models/user");
var middleware  = require("../middleware");
var Comment     = require("../models/comment");
var Wynik       = require("../models/wynik");



router.get("/map", function(req, res){
	Wynik.find({}, function(err, allWynik){

		if(err){
			console.log(err);
		}
		else{
		res.render('map/map', {wynik: allWynik});
		// console.log(allWynik)
		}
	})
});


module.exports = router;