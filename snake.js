class Snake {
  constructor(posX, posY, dx, dy, cells, maxCells, score, state) {
    this.posX = posX;
    this.posY = posY;
    this.dx = dx;
    this.dy = dy;
    this.cells = cells;
    this.maxCells = maxCells;
    this.score = score;
    this.state = state;
  }

  drawing(color) {
    this.cells.forEach((el) => {
      context.fillStyle = color;
      context.fillRect(el.x, el.y, grid - 1, grid - 1);
    });
  }

  getSnakeStep(instance) {
    if (this.eatFood(instance) == true) {
      instance.maxCells++;
      instance.score++;

      apple.setFoodPosition();
    }
    this.getCollision();
  }

  eatFood(instance) {
    let check = instance.cells.some(function (el) {
      if (el.x === apple.x && el.y === apple.y) {
        return true;
      } else {
        return false;
      }
    });
    return check;
  }

  getCollision() {
    this.cells.forEach((el, index) => {
      for (let i = index + 1; i < snake.cells.length; i++) {
        if (el.x === snake.cells[i].x && el.y === snake.cells[i].y && this.cells.length > 4) {
          gameService._renderLose();
          gamestart = false;
          gameService.restart();
        }
      }
    });
  }

  getEnemyCollision(enemy) {
    this.cells.forEach((el) => {
      enemy.cells.forEach((el2) => {
        if (el.x == el2.x && el.y == el2.y) {
          gameService._renderLose();
          gamestart = false;
          gameService.restart();
        }
      });
    });
    return false;
  }

  turnLeft() {
    this.dy = 0;
    this.dx = -grid;
  }

  turnRight() {
    this.dx = grid;
    this.dy = 0;
  }

  turnUp() {
    this.dx = 0;
    this.dy = -grid;
  }

  turnDown() {
    this.dx = 0;
    this.dy = grid;
  }
  turnRandom(firstRoute, secondRoute) {
    const rand = Math.floor(Math.random() * 4);
    if (rand == 0 && (firstRoute == "left" || secondRoute == "left")) {
      this.turnLeft();
    } else if (rand == 1 && (firstRoute == "right" || secondRoute == "right")) {
      this.turnRight();
    } else if (rand == 2 && (firstRoute == "up" || secondRoute == "up")) {
      this.turnUp();
    } else if (rand == 3 && (firstRoute == "down" || secondRoute == "down")) {
      this.turnDown();
    } else {
      this.turnRandom(firstRoute, secondRoute);
    }
  }

  checkEnemyDeath() {
    if (this.dx == 0 && this.dy == 0) {
      this.state = "Врезался!!!";
      return true;
    }
    return false;
  }
}
