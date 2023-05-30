let socket = io();
let side = 20;
let buttonDzmer = document.getElementById("buttonDzmer");
let buttonGarun = document.getElementById("buttonGarun");
let buttonOriginal = document.getElementById("buttonOriginal");
buttonGarun.addEventListener("click", changetoAutumn);
buttonDzmer.addEventListener("click", changetoWinter);
buttonOriginal.addEventListener("click", changetoOriginal);

const color = {
  // green: "green",
  // grey: "#acacac",
  // yellow: "yellow",
  // orange: "orange",
  // red: "red",
  // purple: "purple",
  // moss: "#869b5b",
  // rust: "#ab6334",
  // winter1: "#9aa2ae",
  // winter2: "#73787e",
  // winter3: "#b6c6d6",
  // white: "white",
  grass: "green",
  grassEater: "red",
  grassAllergy: "yellow",
  background: "#acacac",
  grassEaterEater: "purple",
  predator: "blue",
  rock: "black",
};
function changetoOriginal() {
  color.grass = "green";
  color.grassEater = "red";
  color.grassAllergy = "yellow";
  color.background = "#acacac";
  color.grassEaterEater = "purple";
}
function changetoWinter() {
  color.grass = "white";
  color.grassAllergy = "#acacac";
  color.grassEater = "#9aa2ae";
  color.grassEaterEater = "#adbce6";
}

function changetoAutumn() {
  color.grass = "green";
  color.grassAlergy = "#869b5b";
  color.grassEater = "#ab6334";
  color.grassEaterEater = "orange";
}

function setup() {
  createCanvas(20 * side, 20 * side);
  background("#acacac");
}

function drawGame(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill(color.grass);
      } else if (matrix[y][x] == 0) {
        fill(color.background);
      } else if (matrix[y][x] == 2) {
        fill(color.grassEater);
      } else if (matrix[y][x] == 3) {
        fill(color.predator);
      } else if (matrix[y][x] == 4) {
        fill(color.grassAllergy);
      } else if (matrix[y][x] == 5) {
        fill(color.grassEaterEater);
      } else if (matrix[y][x] == 6) {
        fill(color.rock);
      }
      rect(x * side, y * side, side, side);
    }
  }
}
function writeStatistics(grassArrStats) {
  const stat = document.getElementById("statisticsNum");
  stat.innerText = grassArrStats;
}
socket.on("send matrix", drawGame);
socket.on("stats", writeStatistics);
