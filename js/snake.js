const changeDirection = (keyCode) => {
    const direction = mapKeyCode(keyCode);

    if (_hasDirection(state.snake, direction)) {
        state.snake.direction = direction;
    }
    
};

const moveSnake = () => {
    const headSnake = _getHeadSnake(snake);
    const direction = state.snake.direction;
    let newMovementSnake;

    if (direction === "left") {
        newMovementSnake = { x: headSnake.x - 1, y: headSnake.y, d: direction, h: true };
    }
    if (direction === "right") {
        newMovementSnake = { x: headSnake.x + 1, y: headSnake.y, d: direction, h: true };
    }
    if (direction === "up") {
        newMovementSnake = { x: headSnake.x, y: headSnake.y - 1, d: direction, h: true };
    }
    if (direction === "down") {
        newMovementSnake = { x: headSnake.x, y: headSnake.y + 1, d: direction, h: true };
    }

    newMovementSnake = _setTeleportSnake(state.snake, newMovementSnake);
    state.snake.tail.shift();
    headSnake.h = false;

    state.snake.tail.push(newMovementSnake);
};

const _setTeleportSnake = (snake, newHeadSnake) => {
    const { direction } = snake;
    const rowEdge = row - 1;

    if (newHeadSnake.x > rowEdge && direction === "right") {
        return { ...newHeadSnake, x: 0 };
    }
    if (newHeadSnake.x < 0 && direction === "left") {
        return { ...newHeadSnake, x: rowEdge};
    }
    if (newHeadSnake.y < 0 && direction === "up") {
        return { ...newHeadSnake, y: rowEdge};
    }
    if (newHeadSnake.y > rowEdge && direction === "down") {
        return { ...newHeadSnake, y: 0};
    }

    return { ...newHeadSnake };
}

const _hasDirection = (snake,direction) => {
    const headSnake = _getHeadSnake(snake);

    if (
        (direction === "left" && headSnake.d !== "right") ||
        (direction === "right" && headSnake.d !== "left") ||
        (direction === "up" && headSnake.d !== "down") ||
        (direction === "down" && headSnake.d !== "up")
    ) {
        return true;
    }
    return false;
}

const _getHeadSnake = (snake) => {
    return snake.tail[snake.tail.length - 1];
};