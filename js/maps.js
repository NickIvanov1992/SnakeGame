const map1 = {
    cords: [
    ],
    completed:394
};
const map2 = {
    cords:[],
    completed: 394
};
const map3 = {
    cords:[],
    completed: 394
};
const map4 = {
    cords:[],
    completed: 394
};

const generateMap = (map, axis, from, to, numRestAxis) => {
    const countInteration = to - from;
    const getRestAxis = (axis === "x") ? "y" : "x";
    let cords;

    for (let i = 0; i < countInteration; i += 1) {
        cords = { [axis]: from + i, [getRestAxis]: numRestAxis };
        map.cords.push(cords);
    }

    map.completed = map.completed - countInteration;
};

generateMap(map2, "x", 6, 13, 8);
generateMap(map2, "x", 6, 13, 11);
generateMap(map2, "x", 6, 13, 10);

generateMap(map3, "x", 0, 20, 0);
generateMap(map3, "x", 1, 20, 19);

generateMap(map4, "x", 7, 13, 4);
generateMap(map4, "y", 7, 13, 3);