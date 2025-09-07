const gameBoard = document.querySelector(".game");
const gridSize = 20;
let snakeBody = [];
let food = 0;
let direction = 1;
let isGameOver = false;
let gameLoop;

function getRandomFoodPosition() {
    return Math.floor(Math.random() * gridSize * gridSize);
}

function updateSnake() {
    if (isGameOver) return;
    const newHead = snakeBody[0] + direction;
    snakeBody.unshift(newHead);
    if (newHead === food) {
        food = getRandomFoodPosition();
    } else {
        snakeBody.pop();
    }
}

function drawSnake() {
    gameBoard.innerHTML = "";
    snakeBody.forEach(index => {
        const snakeElement = document.createElement("div");
        snakeElement.classList.add("snake");
        snakeElement.style.gridColumnStart = (index % gridSize) + 1;
        snakeElement.style.gridRowStart = Math.floor(index / gridSize) + 1;
        gameBoard.appendChild(snakeElement);
    });
}

function drawFood() {
    const foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.gridColumnStart = (food % gridSize) + 1;
    foodElement.style.gridRowStart = Math.floor(food / gridSize) + 1;
    gameBoard.appendChild(foodElement);
}

function checkGameOver() {
    const head = snakeBody[0];
    if (
        head >= gridSize * gridSize ||
        head < 0 ||
        (direction === 1 && head % gridSize === 0) ||
        (direction === -1 && (head + 1) % gridSize === 0) ||
        snakeBody.slice(1).includes(head)
    ) {
        isGameOver = true;
        document.querySelector('.game-over-screen').style.display = 'block';
        clearInterval(gameLoop);
    }
}

function handleKeyPress(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction !== gridSize) {
        direction = -gridSize;
    } else if (key === "ArrowDown" && direction !== -gridSize) {
        direction = gridSize;
    } else if (key === "ArrowLeft" && direction !== 1) {
        direction = -1;
    } else if (key === "ArrowRight" && direction !== -1) {
        direction = 1;
    }
}

function main() {
    updateSnake();
    checkGameOver();
    if (!isGameOver) {
        drawSnake();
        drawFood();
    }
}

function startGame() {
    snakeBody = [2, 1];
    food = getRandomFoodPosition();
    direction = 1;
    isGameOver = false;
    document.querySelector('.game-over-screen').style.display = 'none';
    gameLoop = setInterval(main, 200);
}

document.addEventListener("keydown", handleKeyPress);

document.getElementById('up').addEventListener('click', () => {
    if (direction !== gridSize) direction = -gridSize;
});
document.getElementById('down').addEventListener('click', () => {
    if (direction !== -gridSize) direction = gridSize;
});
document.getElementById('left').addEventListener('click', () => {
    if (direction !== 1) direction = -1;
});
document.getElementById('right').addEventListener('click', () => {
    if (direction !== -1) direction = 1;
});
document.getElementById('restart').addEventListener('click', () => {
    startGame();
});

startGame();
