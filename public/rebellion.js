
// // new global arr creation

// // simulation of databas
// const star = [
//   {
//     ktoG: 'kozi',
//     wygral: 'Wygralem',
//     stronnictwo: 'Rebelia',
//     wersja: 'Rozszerzona',
//     base: 'Ilum',
//     round: 1,
//     token: 1,
//     __v: 0
//   },
//   {

//     ktoG: 'kozi',
//     wygral: 'Wygralem',
//     stronnictwo: 'Rebelia',
//     wersja: 'Rozszerzona',
//     base: 'Rodia',
//     round: 1,
//     token: 1,
//     __v: 0
//   },
//   {
//     ktoG: 'kozi',
//     wygral: 'Wygralem',
//     stronnictwo: 'Rebelia',
//     wersja: 'Rozszerzona',
//     base: 'Hoth',
//     round: 1,
//     token: 1,
//     __v: 0
//   },
//   {
//     ktoG: 'kozi',
//     wygral: 'Wygralem',
//     stronnictwo: 'Rebelia',
//     wersja: 'Rozszerzona',
//     base: 'Bespin',
//     round: 1,
//     token: 1,
//     __v: 0
//   },
//   {
//     ktoG: 'kozi',
//     wygral: 'Wygralem',
//     stronnictwo: 'Rebelia',
//     wersja: 'Rozszerzona',
//     base: 'Bespin',
//     round: 1,
//     token: 1,
//     __v: 0
//   },
//   {
//     ktoG: 'kozi',
//     wygral: 'Wygralem',
//     stronnictwo: 'Rebelia',
//     wersja: 'Rozszerzona',
//     base: 'Bespin',
//     round: 1,
//     token: 1,
//     __v: 0
//   },
//   {
//     ktoG: 'kozi',
//     wygral: 'Wygralem',
//     stronnictwo: 'Rebelia',
//     wersja: 'Rozszerzona',
//     base: 'Ilum',
//     round: 1,
//     token: 1,
//     __v: 0
//   },
//   {
//     ktoG: 'kozi',
//     wygral: 'Wygralem',
//     stronnictwo: 'Rebelia',
//     wersja: 'Rozszerzona',
//     base: 'Ilum',
//     round: 1,
//     token: 1,
//     __v: 0
//   }
// ]


// for(const baza in star){
//   console.log(baza)
// }
// // console.log(star[base])

// // base arr global creation
// var baseL= []
// // base value sending to new arr
// function baseList(baza) {
//   for (let i=0; i<baza.length; i+=1) {
//    baseL.push(baza[i].base);
//   }
//   return baseL;
// }
// baseList(star)
// console.log(baseL)


// var newbase = star.reduce(function (n, person){
//   return n + (person.base == "Ilum")
// });

// console.log(newbase)


// // calculate how many same tape of base i have in arra
// function location(array, value) {
//   return array.filter((v) => (v === value)).length;
// }

// // function chceck (el){
// //   return el
// // }
// // var planeta = baseL.filter()


// // let szukacz = function (){
// //   for (let i = 0; i < baseL.length; i++) {
// //     if (baseL[i] === "Bespin"){
// //       return bespinn.push(baseL[i])
// //     }
// // }
// // }
// var bespin = [];
// var ilum = [];
// var hoth = [];


// // console.log(baseL.length)
// // console.log(baseL[4])
// // console.log(szukacz())
// // console.log(bespinn)


// function chceck(){
//   for (let i = 0; i < baseL.length; i++) {
//     if (baseL[i] === "Bespin"){
//     bespin.push(baseL[i])}
//     else if (baseL[i] === "Ilum") {
//       ilum.push(baseL[i])
//     }
//     else if (baseL[i] === "Hoth") {
//       hoth.push(baseL[i])
//     }
//   }
// }
// chceck()

// console.log(hoth)

// // baseL.forEach(newfun)
// // forEach.getOccurrence(baseL, "Ilum")

// // let illum = getOccurrence(baseL, "Ilum");
// // let bespin = getOccurrence(baseL, "Bespin");



// console.log(bespin)
// console.log(ilum.length)

// console.log(location(baseL, "Ilum"));  // 2
// console.log(location(baseL, "Bespin"));  // 3

// // function pop() {
// //   var popup = document.getElementById('myPopup');
// //   popup.classList.toggle('show');
// // }
