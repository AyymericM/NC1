const hButton = document.querySelector(".buttonUp");
const bButton = document.querySelector(".buttonDown");
const dButton = document.querySelector(".buttonRight");
const gButton = document.querySelector(".buttonLeft");

let direction = "haut";

let cordY = 200;
let cordX = 200;

console.log(cordX);
/*
document.addEventListener(
  "keydown",
  (event) => {
    if (event.keyCode === 38) {
      hButton.style.boxShadow = "none";
      hButton.style.background = "#840d0e";
      console.log("test");
    }
  }
);
*/

document.addEventListener(
  "keydown",
  (event) => {
    if (event.keyCode === 38) {
      direction = "haut";
      console.log("test");
    }
    else if (event.keyCode === 39) {
      direction = "droite";
      console.log("test");
    }
    else if (event.keyCode === 40) {
      direction = "bas";
      console.log("test");
    }
    else if (event.keyCode === 37) {
      direction = "gauche";
      console.log("test");
    }
  }
);

setInterval(
  () => {
    if (direction === "haut") {
      hButton.style.top = ""
    }
  },
  1000
);
