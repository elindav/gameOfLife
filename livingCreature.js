module.exports = class LivingCreature {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
    this.index = index;
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
  chooseCell(ch) {
    const found = [];
    for (const i in this.directions) {
      const x = this.directions[i][0];
      const y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == ch) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  random(arr){
let result = Math.floor(Math.random()*arr.length)
return arr[result];
  }
}
