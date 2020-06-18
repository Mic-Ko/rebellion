var express = require("express");
var router = express.Router();
var Wynik = require("../models/wynik");
var middleware = require("../middleware");
var User		= require("../models/user");


// ta sciezka pokazyje wyniki
router.get("/", function(req, res){
	Wynik.find({}, function(err, allWyniki){
		if(err){
			console.log(err);
		}
		else{
		res.render('wynik/wynik', {wynik: allWyniki});
		}
	})
});


// odsylacz do formy do wypelniania wynikoiw
router.get("/new", middleware.isLoggedIn, function(req,res){
	// res.render odda uzytkownikowi plik ktory wpiszemy
	res.render("wynik/formul")
});


router.get("/:id", function(req, res){
	Wynik.findById(req.params.id).populate("comments").exec(function(err, foundWynik){
		if(err){
			console.log(err)
		}
		else{
			console.log(foundWynik)
			res.render("wynik/show",{wynik: foundWynik});
		}
	});
});




// wysyła do bazy danych co chcemy i wraca na strone z wynikami
router.post("/", middleware.isLoggedIn, function(req, res){
	var ktoG= {
		id:req.user._id,
		username: req.user.username
	};
	var kto= req.body.wynik.kto;
	var wygral= req.body.wynik.wygral;
	var stronnictwo= req.body.wynik.stronnictwo;
	var opponent= req.body.wynik.opponent;
	var base= req.body.wynik.base;
	var round= req.body.wynik.round;
	var token= req.body.wynik.token;
	var author = {
		id:req.user._id,
		username: req.user.username
	}
	var newWynik = {ktoG: ktoG, kto:kto, wygral: wygral, stronnictwo:stronnictwo, opponent:opponent, base:base, round:round, token:token, author: author}
	Wynik.create(newWynik, function(err, newlyCreated )
		{if(err){
			console.log(err)
		}
		else{
			res.redirect("/wynik")
		}
	});
});



router.get("/:id/edit", middleware.checkWynikOwnership, function(req, res){
	Wynik.findById(req.params.id, function(err, foundWynik){
		if(err){
			res.redirect("/wynik")
		}else{
			res.render("wynik/edit", {wynik: foundWynik});
		}
	});
});

// matedoa na uaktualnienie posta Blog.findByIdAndUpdate(id, newData, callback)
router.put("/:id", middleware.checkWynikOwnership, function(req, res){
	Wynik.findByIdAndUpdate(req.params.id, req.body.wyniki, function(err, updatedBlog){
		if(err){
			res.redirect("/wynik")
		}else{
			res.redirect("/wynik/"+ req.params.id);
		}
	});
});


router.delete("/:id",middleware.checkWynikOwnership, function(req, res){
	Wynik.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/wynik");
		}else{
			res.redirect("/wynik")
		}
	})
});






module.exports= router;


















































// // pobranie obozow z bazy danych

// router.get("/", function(req, res){
// 	Campground.find({}, function(err, allCampgrounds){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 		res.render('campgrounds/index', {campgrounds: allCampgrounds});
// 		}

// 	})
// 	// res.render('campgrounds', {campgrounds: campgrounds});
// });


// // forma do wypełniena zeby utworzyc nowy oboz
// router.get("/new", isLoggedIn, function(req, res){
// 	res.render("campgrounds/new");

// });

// // show route
// router.get("/:id", function(req, res){
// 	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
// 		if(err){
// 			console.log(err)
// 		}
// 		else{
// 			console.log(foundCampground)
// 			res.render("campgrounds/show",{campground: foundCampground});
// 		}
// 	});

// })

// //create route
// router.post("/", isLoggedIn,  function(req, res){
// 	var name= req.body.name;
// 	var image= req.body.image;
// 	var desc= req.body.description;
// 	var author = {
// 		id:req.user._id,
// 		username: req.user.username
// 	}
// 	var newCampground = {name: name, image: image, description: desc, author: author}
// 	Campground.create(newCampground, function(err, newlyCreated){
// 		if(err){
// 			console.log(err)
// 		}
// 		else{
// 			res.redirect("/campgrounds")
// 		}
// 	})
// 	// przekierowanie spowrotem na czas z obozami
// });


// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login")
// }


// module.exports= router;