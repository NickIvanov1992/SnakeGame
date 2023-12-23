let width, height, board, popup, row, ceil, colors, amountLevels;

width = 600;

board = {
    width,
    height: 60,
    font: "normal 25px Arial, sans-serif",
    textScore: {
        x: 80,
        y: 40
    },
    textLevel: {
        x: 500,
        y: 40
    },
    apples: {
        x: 15,
        y: 15
    }
};

height = width + board.height;
popup = {
    width: 200,
    height: 100,
    font: "normal 25px Arial, sans-serif"
};

ceil = 30;
row = width / ceil;

colors = {
    snakeHead: "#00ffff",
    snakeBody: "#1fb9dd",
    wall: "#425870",
    apples: "#d86464",
    text: "#000000",
    popup:"#e0cd1e"
};

amountLevels = 4;