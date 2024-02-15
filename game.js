//game
var canvas = document.getElementById("game");
//поле
var context = canvas.getContext("2d");

//Размер клетки
var grid = 16;
//скорость счетчик кадров
var count = 0;
//Переменная для шага
var steps = false;
//Размер экрана
var screenWidth = 63;
var screenHeight = 45;

const snake = new Snake(32, 32, grid, 0, [], 4, 0);
//враг
const enemy = new Snake(496, 496, grid, 0, [], 4, 0, "");
const apple = new Food(64, 64);

//рисуем первый уровень
const firstMap = new GameMap(1, 20);
const gameService = new GameService(snake, enemy, apple, firstMap);

//стартовая инфа
var Popup = {
  width: 200,
  height: 100,
  font: "25px Arial",
};

//строим граф
var graph = {};
//Переменная родителей
var parents = {};
let gamestart = false;

if (gamestart == false) {
  gameService._renderPopup();
}
// firstMap.getCosts();
// firstMap.getBfs(graph);
function loop() {
  if (gamestart == true) {
    requestAnimationFrame(loop);
  }

  if (++count < 10) {
    return;
  }
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  gameService.getStep();
  if (enemy.checkEnemyDeath() == false) {
    gameService.movingEnemy(firstMap);
  }
  gameService.checkBorders();

  firstMap.drawingMap();

  //Добавляем счетчик очков

  //добавляем яблоко
  apple.drawingFood();
  snake.drawing("green");
  snake.getSnakeStep(snake);

  snake.getEnemyCollision(enemy);

  //если врезался в стену
  if (gameService.checkWallCollision(firstMap) == true) {
    gameService._renderLose();
    gamestart = false;

    // gameService.restart();
  }

  //применяем переменную stepsчтобы не нажимались две кнопки одновременно
  steps = true;
  gameService.getScores();
  enemy.drawing("yellow");
  enemy.getSnakeStep(enemy);
  gameService.onKeydown();
  gameService.getScores();
}

requestAnimationFrame(loop);
