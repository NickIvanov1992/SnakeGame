class GameService {
  constructor(userSnake, enemySnake, food, map) {
    this.enemySnake = enemySnake;
    this.userSnake = userSnake;
    this.food = food;
    this.map = map;
  }
  getStep() {
    this.enemySnake.posX += this.enemySnake.dx;
    this.enemySnake.posY += this.enemySnake.dy;
    this.userSnake.posX += this.userSnake.dx;
    this.userSnake.posY += this.userSnake.dy;

    this.enemySnake.cells.unshift({
      x: this.enemySnake.posX,
      y: this.enemySnake.posY,
    });
    this.userSnake.cells.unshift({
      x: this.userSnake.posX,
      y: this.userSnake.posY,
    });

    if (
      this.enemySnake.cells.length > this.enemySnake.maxCells &&
      this.enemySnake.checkEnemyDeath() == false
    ) {
      this.enemySnake.cells.pop();
    }
    if (this.userSnake.cells.length > this.userSnake.maxCells) {
      this.userSnake.cells.pop();
    }
  }

  checkBorders() {
    if (
      this.userSnake.posX < 0 ||
      this.userSnake.posX >= canvas.clientWidth ||
      this.userSnake.posY < 0 ||
      this.userSnake.posY >= canvas.clientHeight
    ) {
      this._renderLose();
      this.restart();
      gamestart = false;
    }
  }

  checkWallCollision(map) {
    if (map.selectMap()[this.userSnake.posY / grid][this.userSnake.posX / grid] == 0) {
      return true;
    }
    return false;
  }

  onKeydown() {
    document.addEventListener("keydown", function (e) {
      if (e.which === 37 && snake.dx === 0 && steps === true) {
        snake.turnLeft();
        steps = false;
      } else if (e.which === 38 && snake.dy === 0 && steps === true) {
        snake.turnUp();
        steps = false;
      } else if (e.which === 39 && snake.dx === 0 && steps === true) {
        snake.turnRight();
        steps = false;
      } else if (e.which === 40 && snake.dy === 0 && steps === true) {
        snake.turnDown();
        steps = false;
      }
    });
  }

  restart() {
    snake.posX = 32;
    snake.posY = 32;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    snake.score = 0;
    enemy.posX = 496;
    enemy.posY = 496;
    enemy.cells = [];
    enemy.maxCells = 4;
    enemy.dx = grid;
    enemy.dy = 0;
    enemy.score = 0;
    enemy.state = "";
    apple.setFoodPosition();
  }

  getScores() {
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText(
      "Твои очки: " +
        this.userSnake.score +
        "  " +
        "Текущий уровень: Level1" +
        "  " +
        "Очки врага:" +
        this.enemySnake.score +
        "  " +
        this.enemySnake.state,
      grid,
      grid
    );
  }

  _renderPopup = () => {
    context.fillStyle = "yellow";
    context.fillRect(100, 100, 800, 500);

    const button = document.createElement("button");
    button.id = "startButton";
    button.onclick = function () {
      gamestart = true;
      requestAnimationFrame(loop);
      button.remove();
    };
    button.textContent = "Start new game";
    document.body.appendChild(button);

    let startImg = new Image(80, 50);
    startImg.onload = function () {
      context.drawImage(startImg, 300, 150, 500, 300);
    };
    startImg.src = "snake.jpg";
  };

  _renderLose = () => {
    context.fillStyle = "yellow";
    context.fillRect(100, 100, 800, 500);

    const button = document.createElement("button");
    button.id = "startButton";

    button.textContent = "Start new game";
    document.body.appendChild(button);

    let loseImg = new Image(80, 50);

    loseImg.onload = function () {
      context.drawImage(loseImg, 300, 150, 500, 300);
    };
    loseImg.src = "gameOver.bmp";

    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseLine = "middle";
    context.font = "25px Arial";
    context.fillText(`Ты проиграл. Ваши очки: ${this.userSnake.score}`, 650, 500);

    button.onclick = function () {
      gameService.restart();
      gamestart = true;
      requestAnimationFrame(loop);
      button.remove();
    };
  };

  movingEnemy(map) {
    let checkRightMapBorder =
      map.selectMap()[this.enemySnake.posY / grid][this.enemySnake.posX / grid + 1];
    let checkLeftMapBorder =
      map.selectMap()[this.enemySnake.posY / grid][this.enemySnake.posX / grid - 1];
    let checkUpMapBorder =
      map.selectMap()[this.enemySnake.posY / grid - 1][this.enemySnake.posX / grid];
    let checkDownMapBorder =
      map.selectMap()[this.enemySnake.posY / grid + 1][this.enemySnake.posX / grid];

    const checkEnemyLeftCells =
      (this.enemySnake.cells.find(
        (item) => item.x == this.enemySnake.posX - grid && item.y == this.enemySnake.posY
      ) &&
        true) ||
      false;

    const checkEnemyRightCells =
      (this.enemySnake.cells.find(
        (item) => item.x == this.enemySnake.posX + grid && item.y == this.enemySnake.posY
      ) &&
        true) ||
      false;

    const checkEnemyUpCells =
      (this.enemySnake.cells.find(
        (item) => item.x == this.enemySnake.posX && item.y == this.enemySnake.posY - grid
      ) &&
        true) ||
      false;

    const checkEnemyDownCells =
      (this.enemySnake.cells.find(
        (item) => item.x == this.enemySnake.posX && item.y == this.enemySnake.posY + grid
      ) &&
        true) ||
      false;

    if (
      this.food.x < this.enemySnake.posX &&
      checkLeftMapBorder != 0 &&
      checkEnemyLeftCells == false
    ) {
      this.enemySnake.turnLeft();
    } else if (
      this.food.x < this.enemySnake.posX &&
      checkLeftMapBorder == 0 &&
      checkUpMapBorder != 0 &&
      checkDownMapBorder != 0 &&
      checkEnemyUpCells == false &&
      checkEnemyDownCells == false
    ) {
      this.enemySnake.turnRandom("up", "down");
    } else if (
      this.food.x < this.enemySnake.posX &&
      checkLeftMapBorder == 0 &&
      checkUpMapBorder == 0 &&
      checkEnemyRightCells == false
    ) {
      this.enemySnake.turnRight();
    } else if (
      this.food.x > this.enemySnake.posX &&
      checkRightMapBorder != 0 &&
      checkEnemyRightCells == false
    ) {
      this.enemySnake.turnRight();
    } else if (
      this.food.x < this.enemySnake.posX &&
      checkRightMapBorder == 0 &&
      checkDownMapBorder != 0 &&
      checkEnemyDownCells == false
    ) {
      this.enemySnake.turnDown();
    } else if (
      this.food.x > this.enemySnake.posX &&
      this.food.y == this.enemySnake.posY &&
      checkRightMapBorder != 0 &&
      checkEnemyRightCells == false
    ) {
      this.enemySnake.turnRight();
    } else if (
      this.food.x > this.enemySnake.posX &&
      checkRightMapBorder == 0 &&
      checkUpMapBorder != 0 &&
      checkDownMapBorder != 0 &&
      checkEnemyUpCells == false &&
      checkEnemyDownCells == false
    ) {
      this.enemySnake.turnRandom("up", "down");
    } else if (
      this.food.x > this.enemySnake.posX &&
      checkRightMapBorder == 0 &&
      checkUpMapBorder == 0 &&
      checkLeftMapBorder != 0 &&
      checkEnemyDownCells == true &&
      checkEnemyLeftCells == false
    ) {
      this.enemySnake.turnLeft();
    } else if (
      this.food.x > this.enemySnake.posX &&
      checkRightMapBorder == 0 &&
      checkUpMapBorder == 0 &&
      checkDownMapBorder != 0 &&
      checkEnemyDownCells == false
    ) {
      this.enemySnake.turnDown();
    } else if (
      this.food.y < this.enemySnake.posY &&
      checkUpMapBorder != 0 &&
      checkEnemyUpCells == false
    ) {
      this.enemySnake.turnUp();
    } else if (
      this.food.y < this.enemySnake.posY &&
      checkUpMapBorder == 0 &&
      checkLeftMapBorder != 0 &&
      checkEnemyLeftCells == false
    ) {
      this.enemySnake.turnLeft();
    } else if (
      this.food.y < this.enemySnake.posY &&
      checkUpMapBorder == 0 &&
      checkLeftMapBorder == 0 &&
      checkEnemyRightCells == false
    ) {
      this.enemySnake.turnRight();
    } else if (
      this.food.y > this.enemySnake.posY &&
      checkDownMapBorder != 0 &&
      checkUpMapBorder == 0 &&
      checkEnemyDownCells == false &&
      checkEnemyLeftCells == true
    ) {
      this.enemySnake.turnRandom("right", "down");
    } else if (
      this.food.y > this.enemySnake.posY &&
      checkDownMapBorder == 0 &&
      checkLeftMapBorder != 0 &&
      checkEnemyLeftCells == false
    ) {
      this.enemySnake.turnLeft();
    } else if (
      this.food.y > this.enemySnake.posY &&
      checkDownMapBorder == 0 &&
      checkLeftMapBorder == 0 &&
      checkEnemyRightCells == false
    ) {
      this.enemySnake.turnRight();
    } else if (
      this.food.y < this.enemySnake.posY &&
      checkDownMapBorder == 0 &&
      checkLeftMapBorder == 0 &&
      checkEnemyUpCells == true &&
      checkEnemyRightCells == false
    ) {
      this.enemySnake.turnRight();
    } else if (
      this.food.x > this.enemySnake.posX &&
      checkRightMapBorder == 0 &&
      checkDownMapBorder != 0 &&
      checkEnemyUpCells == true &&
      checkEnemyDownCells == false
    ) {
      this.enemySnake.turnDown();
    } else if (
      checkRightMapBorder == 0 &&
      checkUpMapBorder == 0 &&
      checkEnemyDownCells == true &&
      checkEnemyRightCells == false
    ) {
      this.enemySnake.turnRight();
    } else if (
      checkUpMapBorder == 0 &&
      checkEnemyDownCells == true &&
      checkEnemyLeftCells == false &&
      checkEnemyRightCells == false
    ) {
      this.enemySnake.turnRandom("left", "right");
    } else if (
      checkUpMapBorder == 0 &&
      checkLeftMapBorder == 0 &&
      checkEnemyRightCells == true &&
      checkEnemyDownCells == false
    ) {
      this.enemySnake.turnDown();
    } else if (
      checkUpMapBorder != 0 &&
      checkLeftMapBorder == 0 &&
      checkEnemyRightCells == true &&
      checkEnemyUpCells == false &&
      checkDownMapBorder == 0
    ) {
      this.enemySnake.turnUp();
    } else if (
      checkDownMapBorder == 0 &&
      checkRightMapBorder != 0 &&
      checkEnemyUpCells == true &&
      checkEnemyRightCells == false
    ) {
      this.enemySnake.turnRight();
    } else if (
      checkRightMapBorder == 0 &&
      checkDownMapBorder == 0 &&
      checkEnemyLeftCells == true &&
      checkEnemyUpCells == false
    ) {
      this.enemySnake.turnUp();
    } else if (
      this.food.y > this.enemySnake.posY &&
      checkDownMapBorder != 0 &&
      checkEnemyDownCells == false
    ) {
      this.enemySnake.turnDown();
    } else if (checkEnemyUpCells == true && checkDownMapBorder) {
      this.enemySnake.turnDown();
    } else if (checkEnemyDownCells == true && checkUpMapBorder) {
      this.enemySnake.turnUp();
    } else if (checkEnemyLeftCells == true && !checkUpMapBorder) {
      this.enemySnake.turnRight();
    } else if (checkEnemyDownCells == true && checkEnemyRightCells == true && checkUpMapBorder) {
      this.enemySnake.turnLeft();
    } else if (!checkRightMapBorder && checkEnemyLeftCells) {
      this.enemySnake.turnRandom("up", "down");
    } else {
      //враг проиграл
      this.enemySnake.dx = 0;
      this.enemySnake.dy = 0;
    }
  }
}
