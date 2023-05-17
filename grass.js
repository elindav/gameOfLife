const LivingCreature = require("./livingCreature")
module.exports=class Grass extends LivingCreature {
  mul() {
    this.multiply++;
    const emptyCells = this.chooseCell(0);
    const newCell = this.random(emptyCells);

    if (newCell && this.multiply >= 8) {
      const newX = newCell[0];
      const newY = newCell[1];
      matrix[newY][newX] = 1;

      const newGrass = new Grass(newX, newY);
      grassArr.push(newGrass);
      this.multiply = 0;
    }
  }
}
