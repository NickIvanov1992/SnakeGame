// JavaScript source code
const onload = () =>
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = height;
    canvas.width = width;

    const _renderSnake = (snake, x, y) => {
        snake.tail.forEach(s => {
            if (s.x === x && s.y === y) {
                ctx.fillStyle = colors.snakeBody;
                ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);

                if (s.h) {
                    ctx.fillStyle = colors.snakeHead;
                    ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
                }
            }
        });
    };

    const _renderFood = (food, x, y) => {
        if (food.apples.x === x && food.apples.y === y) {
            ctx.fillStyle = colors.apples;
            ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
        }
    };

    const _renderMap = (map, x, y) => {
        map.cords.forEach(m => {
            if (m.x === x && m.y === y) {
                ctx.fillStyle = colors.wall;
                ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
            }
        });
    };

    const _renderScoreboard = (score, level) => {
        ctx.fillStyle = colors.popup;
        ctx.fillRect(0, 0, board.width, board.height);

        ctx.fillStyle = colors.text;
        ctx.font = board.font;
        ctx.textAlign = "left";
        ctx.textBaseLine = "top";
        ctx.fillText(score, board.textScore.x, board.textScore.y);

        ctx.fillStyle = colors.apples;
        ctx.fillRect(board.apples.x, board.apples.y, ceil, ceil);

        ctx.fillStyle = colors.text;
        ctx.font = board.font;
        ctx.textAlign = "left";
        ctx.fillText(`Level: ${level}`, board.textLevel.x, board.textLevel.y);
    };

    const _renderPopup = (text) => {
        const helfW = (width / 2),
            helfH = (height / 2),
            x = helfW - (popup.width / 2),
            y = helfH - (popup.height / 2);

        ctx.fillStyle = colors.popup;
        ctx.fillRect(x, y, popup.width, popup.height);

        ctx.fillStyle = colors.text;
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";
        ctx.font = popup.font;
        ctx.fillText(text, helfW, helfH);

    };

    const renderGame = () => {
        ctx.clearRect(0, 0, width, height);

        const { snake, food, maps, level, score, gameStart, win, gameOver } = state;

        for (let y = 0; y < row; y += 1) {
            for (let x = 0; x < row; x += 1) {
                //координаты поля
              //  ctx.fillStyle = "aqua";
              //  ctx.fillRect(x * ceil, y * ceil, ceil, ceil);

                _renderSnake(snake, x, y);
                _renderFood(food, x, y);
                _renderMap(maps[`map${level}`], x, y);

            }
        }

        if (!gameStart) {
            _renderPopup("salam");
        }
        if (win) {
            _renderPopup("Win");
        }
        if (gameOver) {
            _renderPopup("GameOver");
        }
        _renderScoreboard(score, level);

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

            if (state.gameStart) {

                checkNextLevel();
                checkWin();
                moveSnake();
                addNewFood();
                renderGame();

                if (state.win) {
                    animateRAFInterval.cancel();
                    document.removeEventListener("keydown", onkeydown);
                }
                if (state.gameOver) {
                    animateRAFInterval.cancel();
                    document.removeEventListener("keydown", onkeydown);
                }
            }
            
        }
    });

    const onKeydown = (e) => {
        state.gameStart = true;

        changeDirection(e.keyCode);
       
    };
    document.addEventListener("keydown", onKeydown);
}
window.addEventListener("load", onload);