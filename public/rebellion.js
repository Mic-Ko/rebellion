function getVal(y){
   return y.value
}



var gra1 = {
    ktoG:"",
    wygral:"",
    stronnictwo:"",
    wersja:"",
    base:"",
    round:"",
    token:"",
     
}

var button = document.getElementById('button');
button.addEventListener('click', function(){
    var game = Object.create(gra1)
    game.ktoG = ktoh.value;
    game.wygral = win.value;
    game.stronnictwo = kim.value;
    game.wersja = rozszerz.value;
    game.base = baza.value;
    game.round = runda.value;
    game.token = znacznik.value;
    return game;
    console.log (game);
});