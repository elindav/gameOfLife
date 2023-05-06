class GrassAllergy extends LivingCreature {
    constructor(x, y, index) {
      super(x, y, index);
      this.x = x;
      this.y = y;
      this.numeaten = 0;
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
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
      if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x];
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
      }
    }
  
    eat() {
      var grassCells = this.chooseCell(1);
      var newCell = random(grassCells);
      if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x];
        matrix[this.y][this.x] = 0;
        this.numeaten++;
        this.x = newX;
        this.y = newY;
        if (this.numeaten > 3) {
          this.die();
        }
  
        for (var i in grassArr) {
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
      for (var i in grassAllergyArr) {
        if (this.x == grassAllergyArr[i].x && this.y == grassAllergyArr[i].y) {
          grassAllergyArr.splice(i, 1);
          break;
        }
      }
    }
  }