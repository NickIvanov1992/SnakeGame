const state = {
    snake:
    {
        tail: [
            { x: 1, y: 1, d: "right", h: false },
            { x: 2, y: 1, d: "right", h: false },
            { x: 3, y: 1, d: "right", h: false },
            { x: 4, y: 1, d: "right", h: true },
        ],
        direction: "right",
        lastPosTail: {},
        speed: 300
    },

    food:
    {
        didAte: true,
        apples: {}
    },

    level: 1,
    maps: {
        "map1": map1,
        "map2": map2,
        "map3": map3,
        "map4": map4
    },
    score: 0,
    nextLevel: false,
    win: false,
    gameStart: false,
    gameOver: false
};