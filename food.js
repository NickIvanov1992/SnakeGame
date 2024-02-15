class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  drawingFood() {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, grid - 1, grid - 1);
  }
  setFoodPosition() {
    let xValue = Math.floor(Math.random() * screenWidth);
    let yValue = Math.floor(Math.random() * screenHeight);
    if (firstMap.selectMap()[yValue][xValue] == 0) {
      return this.setFoodPosition();
    } else {
      this.x = xValue * grid;
      this.y = yValue * grid;
    }
  }
}
