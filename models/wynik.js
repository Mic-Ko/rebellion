var mongoose= require("mongoose");


// schemat nowo powstalej bazy danych
	var wynikSchema = new mongoose.Schema({
		ktoG:String,
		wygral:String,
		stronnictwo:String,
		wersja:String,
		base:String,
		round:Number,
		token:Number,
		author:{
			id: {
				type:mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			username: String
		},
		comments:[
			{
				type: mongoose.Schema.Types.ObjectId,
				ref:"Comment"
			}
		]
	});

var Wynik = mongoose.model("Wynik", wynikSchema);



module.exports = Wynik;






