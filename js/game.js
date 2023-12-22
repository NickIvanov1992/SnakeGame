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

                if (state.food.apples.x === x && state.food.apples.y === y) {
                    ctx.fillStyle = colors.apples;
                    ctx.fillRect(x * ceil, y * ceil, ceil, ceil);
                }

                state.maps[`map${state.level}`].cords.forEach(m => {
                    if (m.x === x && m.y === y) {
                        ctx.fillStyle = colors.wall;
                        ctx.fillRect(x * ceil, y * ceil, ceil, ceil);
                    }
                });
            }
        }
    };
    renderGame();

    let startTime = 0;
    let currentTime = 0;
    let time = 0;
    let currentSecond = 0;

    animateRAFInterval.start(() => {
        if (startTime === 0) {
            startTime = new Date().getTime();

        }
        currentTime = new Date().getTime();
        time = currentTime - startTime;
        currentSecond = Math.floor(time / state.snake.speed);

        if (currentSecond > 0) {
            startTime = 0;

            moveSnake();
            addNewFood();
            renderGame();
        }
    });

    const onKeydown = (e) => {
        changeDirection(e.keyCode);
       
    };
    document.addEventListener("keydown", onKeydown);
}
window.addEventListener("load", onload);