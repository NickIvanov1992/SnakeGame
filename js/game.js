// JavaScript source code
const onload = () =>
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = height;
    canvas.width = width;

    const renderGame = () => {
        ctx.clearRect(0, 0, width, height);

        for (let y = 0; y < row; y += 1) {
            for (let x = 0; x < row; x += 1) {
                //координаты поля
              //  ctx.fillStyle = "aqua";
              //  ctx.fillRect(x * ceil, y * ceil, ceil, ceil);

                state.snake.tail.forEach(s => {
                    if (s.x === x && s.y === y) {
                        ctx.fillStyle = colors.snakeBody;
                        ctx.fillRect(x * ceil, y * ceil, ceil, ceil);

                        if (s.h) {
                            ctx.fillStyle = colors.snakeHead;
                            ctx.fillRect(x * ceil, y * ceil, ceil, ceil);
                        }
                    }
                });
            }
        }
    };
    renderGame();

    const onKeydown = (e) => {
        changeDirection(e.keyCode);
        moveSnake();
        renderGame();
    };
    document.addEventListener("keydown", onKeydown);
}
window.addEventListener("load", onload);