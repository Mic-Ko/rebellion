var express 		= require ("express");
var app 			= express();
var bodyParser 		= require("body-parser")
var cookieParser 	= require('cookie-parser')
var flash 			= require('connect-flash')
var path 			= require('path')
var mongoose 		= require("mongoose")
var methodOverride	= require("method-override")
var Wynik 			= require("./models/wynik"),
	passport 		= require("passport"),
	LocalStrategy	= require("passport-local"),
	Comment			= require("./models/comment"),
	User			= require("./models/user"),
	session = require("express-session");

// requiring routes 
var commentRoutes   = require("./routes/comments"),
	wynikRoutes		= require("./routes/wynik"),
	indexRoutes		= require("./routes/index");
	

mongoose.connect("mongodb://localhost/wyniki_v2", {useUnifiedTopology: true,
useNewUrlParser: true,});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());
app.use(cookieParser());
app.use(methodOverride("_method"))


// ==============================
	// Passport config
// =================================?
app.use(require("express-session")({
	secret:"aron lubi muchy",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});




app.use(indexRoutes);
app.use("/wynik", wynikRoutes);
app.use("/wynik/:id/comments/", commentRoutes);




app.listen(3000, function(){
	console.log("serwer aktywny");
});