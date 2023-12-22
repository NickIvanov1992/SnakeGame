const addNewFood = () => {
    const cordsNewFood = _getFreeSpace();
    if (cordsNewFood) {
        state.food.didAte = false;
        state.food.apples.x = cordsNewFood.x;
        state.food.apples.y = cordsNewFood.y;
    }
};

const _getRandomPosition = (num) => {
    return Math.floor(Math.random() * num);
};

const _getFreeSpace = () => {
    const { snake, food, level, maps } = state;
    const { tail } = snake;
    const { didAte } = food;
    const map = maps[`map${level}`];

    let isNewCordsFood = true, x, y;

    if (!didAte) {
        return false;
    }

    while (isNewCordsFood) {
        x = _getRandomPosition(row);
        y = _getRandomPosition(row);

        for (let i = 0; i < tail.length; i++) {
            if (tail[i].x === x && tail[i].y === y) {
                isNewCordsFood = true;
                break;
            }
            else {
                isNewCordsFood = false;
            }
        }

        if (isNewCordsFood) {
            continue;
        }

        for (let j = 0; j < map.cords.length; j++) {
            if (map.cords[j].x === x && map.cords[j].y === y) {
                isNewCordsFood = true;
                break;
            }
            else {
                isNewCordsFood = false;
            }
        }
    }

    return {x, y}
}