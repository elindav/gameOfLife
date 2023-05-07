var matrix = [];
var side = 20;

let grassArr = [];
let grassEaterArr = [];
let grassEaterEaterArr = [];
let grassAllergyArr = [];
let predatorArr = [];

function setup() {
  function matrixGenerator(
    matrixSize,
    grassCount,
    grassEaterCount,
    predatorCount,
    grassAllergyCount,
    grassEaterEaterCount
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
  }
  matrixGenerator(20, 50, 20, 20, 10, 10);

  frameRate(2);
  createCanvas(matrix[0].length * side, matrix.length * side);
  background("#acacac");

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
}
function draw() {
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
      //     else if (matrix[y][x] == 6) {
      //         fill("white");
      //  }
      rect(x * side, y * side, side, side);
    }
  }
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
}
