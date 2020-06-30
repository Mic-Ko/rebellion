
// ******************************************************
// falcon
// ********************************************************

var mybutton = document.getElementById("myBtn");


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ******************************************************
// form rebel/empire
// ********************************************************


function val() {
  let opE = document.querySelector(".opE");
  let opR = document.querySelector(".opR");
  let eval = document.querySelector(".stR").value;
  let op = document.querySelector(".op").value;
  console.log(op)
  console.log(eval)
  if(eval == op){
      return false
  }else if (eval==="Empire"){
      opE.style.display = "none";
      opR.style.display = "block"
      return true
  }else if (eval === "Rebels"){
      opR.style.display = "none";
      opE.style.display = "block";
      return true
  }else{
    console.log("error")
  }
}
val()

// ******************************************************
// form round and token validation
// ********************************************************
var roundValid = function(){
  let round = document.querySelector(".round").value;
  let tok = document.querySelector(".tok").value;
      if(Number(tok) >= Number(round)){
          return true
      }else {
          return false
      }
}

// ******************************************************
// form submit alert
// ********************************************************


function isValidForm(){
let roundV = roundValid();
let valV = val();
if (roundV && valV) {
  return true;
} else if(roundV == false) {
  alert("Yousa should check round and rebel marker, okeeday?!")
  return false;
}
else if(valV == false){
  alert("Yusa Made Terrible Mistaken!!Check yusa Rebel or Empire side.")
  return false
}
}
