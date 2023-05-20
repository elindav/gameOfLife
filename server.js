var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

server.listen(3000);


matrix = [];
grassArr = [];
grassEaterArr = [];
grassEaterEaterArr = [];
grassAllergyArr = [];
predatorArr = [];

function random(num) {
  return Math.floor(Math.random() * num)
}

function matrixGenerator(
  matrixSize,
  grassCount,
  grassEaterCount,
  predatorCount,
  grassAllergyCount,
  grassEaterEaterCount,
) {
  for (let i = 0; i < matrixSize; i++) {
    matrix[i] = [];
    for (let o = 0; o < matrixSize; o++) {
      matrix[i][o] = 0;
    }
  }
  for (let i = 0; i < grassCount; i++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    matrix[y][x] = 1;
  }
  for (let i = 0; i < grassEaterCount; i++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    matrix[y][x] = 2;
  }
  for (let i = 0; i < predatorCount; i++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    matrix[y][x] = 3;
  }
  for (let i = 0; i < grassAllergyCount; i++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    matrix[y][x] = 4;
  }
  for (let i = 0; i < grassEaterEaterCount; i++) {
    let x = Math.floor(random(matrixSize));
    let y = Math.floor(random(matrixSize));
    matrix[y][x] = 5;
  }
io.emit("senc matrix",matrix)
}
matrixGenerator(20, 50, 20, 20, 10, 10);

const Grass = require("./grass")
const GrassAllergy = require("./grassAllergy")
const GrassEater = require("./grassEater")
const GrassEaterEater = require("./grassEaterEater")
const Predator = require("./predator")


function createObj() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        let gr = new Grass(x, y);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        let grEat = new GrassEater(x, y);
        grassEaterArr.push(grEat);
      } else if (matrix[y][x] == 3) {
        let grEatEat = new GrassEaterEater(x, y);
        grassEaterEaterArr.push(grEatEat);
      } else if (matrix[y][x] == 4) {
        let grAllergy = new GrassAllergy(x, y);
        grassAllergyArr.push(grAllergy);
      } else if (matrix[y][x] == 5) {
        let grAllergy = new Predator(x, y);
        predatorArr.push(grAllergy);
      }
    }
  }
  io.emit("senc matrix",matrix)
}
function play() {
  for (let i in grassArr) {
    grassArr[i].mul();
  }

  for (let i in grassEaterArr) {
    grassEaterArr[i].eat();
  }
  for (let i in grassEaterEaterArr) {
    grassEaterEaterArr[i].eat();
  }
  for (let i in grassAllergyArr) {
    grassAllergyArr[i].eat();
  }
  for (let i in predatorArr) {
    predatorArr[i].eat();
  }
  io.emit("senc matrix",matrix)
}
setInterval(play, 500)

createObj()


