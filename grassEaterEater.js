const LivingCreature = require("./livingCreature")
module.exports=class GrassEaterEater extends LivingCreature {
  constructor(x, y, index) {
    super(x, y, index);
    this.x = x;
    this.y = y;

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

  move() {
    const emptyCells = this.chooseCell(0);
    const newCell = this.random(emptyCells);
    if (newCell) {
      const newX = newCell[0];
      const newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
    }
  }

  eat() {
    const grassEaterCells = this.chooseCell(2);
    const newCell = this.random(grassEaterCells);
    if (newCell) {
      const newX = newCell[0];
      const newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;

      for (const i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
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
      if (
        this.x == grassEaterEaterArr[i].x &&
        this.y == grassEaterEaterArr[i].y
      ) {
        grassEaterArr.splice(i, 1);
        break;
      }
    }
  }
}
