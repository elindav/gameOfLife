const LivingCreature = require("./livingCreature")
module.exports=class GrassEater extends LivingCreature {
  constructor(x, y, index) {
    super(x, y, index);
    this.x = x;
    this.y = y;
    this.energy = 8;
    this.directions = [];
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(character) {
    this.getNewCoordinates();

    return super.chooseCell(character);
  }
  mul() {
    const emptyCells = this.chooseCell(0);
    const newCell = this.random(emptyCells);

    if (newCell) {
      const newX = newCell[0];
      const newY = newCell[1];
      matrix[newY][newX] = 2;

      const newGrass = new GrassEater(newX, newY);
      grassEaterArr.push(newGrass);
      this.energy = 8;
    }
  }

  move() {
    this.energy--;
    const emptyCells = this.chooseCell(0);
    const newCell = this.random(emptyCells);
    if (newCell && this.energy >= 0) {
      const newX = newCell[0];
      const newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
    } else {
      this.die();
    }
  }

  eat() {
    const emptyCells = this.chooseCell(1);
    const newCell = this.random(emptyCells);
    if (newCell) {
      this.energy++;
      const newX = newCell[0];
      const newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
      if (this.energy > 15) {
        this.mul();
      }
      for (const i in grassArr) {
        if (newX == grassArr[i].x && newY == grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }
    } else {
      this.move();
    }
  }

  die() {
    matrix[this.y][this.x] = 0;
    for (const i in grassEaterArr) {
      if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
        grassEaterArr.splice(i, 1);
        break;
      }
    }
  }
}
