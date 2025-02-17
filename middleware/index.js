var Wynik = require ("../models/wynik");
var Comment = require ("../models/comment");






var middlewareObj = {};

middlewareObj.checkCommentOwnership =function(req, res, next){
if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("/back")
			}else {
			if(foundComment.author.id.equals(req.user._id)|| req.user.isAdmin) {
				next();
			}else {
				req.flash("error", "You don't have permission to do that!");
				res.redirect("back");
			}
			}
	});
	}else{
		req.flash("error", "You need to be logged in to do that!")
		res.redirect("back")
	}
}




 middlewareObj.checkWynikOwnership = function(req, res, next){
if(req.isAuthenticated()){
		Wynik.findById(req.params.id, function(err, foundWynik){
			if(err){
				req.flash("error", "Result not found!")
				res.redirect("/back")
			}else {
			if(foundWynik.author.id.equals(req.user._id) || req.user.isAdmin ) {
				next();

			}else {
				req.flash("error", "You don't have permission to do that!");
				res.redirect("back");
			}
			}
	});
	}else{
		req.flash("error", "You need to be logged in to do that!")
		res.redirect("back")
	}
}




middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that")
	res.redirect("/login")
}



module.exports = middlewareObj;