var express = require("express");
var router = express.Router({mergeParams: true});
var Wynik = require("../models/wynik");
var Comment = require("../models/comment");
var middleware = require("../middleware");





// New Comments
router.get("/new",middleware.isLoggedIn, function(req, res){
 	Wynik.findById(req.params.id, function(err, wynik){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new", {wynik: wynik});
		}
	});
});

// Comment create
router.post("/", middleware.isLoggedIn, function(req, res){
	Wynik.findById(req.params.id, function(err, wynik){
		if(err){
			console.log(err);
			res.redirect("/wynik");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save()
					wynik.comments.push(comment);
					wynik.save();
					res.redirect("/wynik/" + wynik._id);
				}
			})
		}
	});
});


// Comment edit route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});


// comment update route

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back")
		} else {
			res.redirect("/wynik/" + req.params.id)
		}
	})
});

// comment destoy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("Success", "Comment deleted")
			res.redirect("/wynik/" + req.params.id);
		}
	});
});





module.exports = router;