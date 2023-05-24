let socket = io ()
let side = 20;
let buttonDzmer = document.getElementById("buttonDzmer");
let buttonGarun = document.getElementById("buttonGarun");
buttonGarun.addEventListener("click",changetoAutumn);
buttonDzmer.addEventListener("click",changetoWinter);

let color = {

  green:"green", grey:"#acacac", yellow:"yellow", orange:"orange", red:"red", purple:"purple", moss:"#869b5b", rust:"#ab6334", winter1:"#9aa2ae",
  winter2:"#73787e", winter3:"#b6c6d6", white:"white"
  
};

function changetoWinter (){
  if( color.green =="green"){
    color = {

      green:"#acacac",
      grey: "#acacac",
      yellow: "#9aa2ae",
      orange: "#73787e",
      red: "#b6c6d6",
      purple: "white"

    };
  } else {

    color = {
      grey: "green",
      winter1: "yellow",
      winter2: "orange",
      winter3: "red",
      white: "purple"

    }
  }
}

function changetoAutumn () {
  if ( color.green == "green"){
    color = {
      green:"green",
      grey: "#869b5b",
      yellow: "yellow",
      orange: "orange",
      red: "red",
      purple: "#ab6334"
    };
  } else {
    color = {
     green: "green",
     moss: "#acacac",
     yellow: "yellow",
     red:"red",
     rust:"purple",
    };
  }
}

function setup() {
  createCanvas(20 * side, 20* side);
  background("#acacac");
}

function drawGame(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 0) {
        fill("#acacac");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("red");
      } else if (matrix[y][x] == 4) {
        fill("orange");
      } else if (matrix[y][x] == 5) {
        fill("purple");
      }
          else if (matrix[y][x] == 6) {
              fill("white");
       }
      rect(x * side, y * side, side, side);
    }
  }
 
}


socket.on("send matrix",drawGame)