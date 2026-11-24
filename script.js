import { getRandomFreeCell, hasSelfCollision, isWallCollision } from "./game-utils.js";

const gameBoard = document.querySelector(".game");
const gameOverScreen = document.querySelector(".game-over-screen");
const gridSize = 20;
const totalCells = gridSize * gridSize;
const TICK_MS = 200;

let snakeBody = [];
let food = null;
let direction = 1;
let isGameOver = false;
let gameLoop = null;

function getRandomFoodPosition() {
    return getRandomFreeCell(snakeBody, totalCells);
}

function updateSnake() {
    if (isGameOver) return;

    const newHead = snakeBody[0] + direction;
    snakeBody.unshift(newHead);

    if (newHead === food) {
        food = getRandomFoodPosition();
        if (food === null) {
            finishGame("You Win!");
        }
    } else {
        snakeBody.pop();
    }
}

function drawSnake() {
    gameBoard.replaceChildren();

    snakeBody.forEach((index) => {
        const snakeElement = document.createElement("div");
        snakeElement.classList.add("snake");
        snakeElement.style.gridColumnStart = (index % gridSize) + 1;
        snakeElement.style.gridRowStart = Math.floor(index / gridSize) + 1;
        gameBoard.appendChild(snakeElement);
    });
}

function drawFood() {
    if (food === null) return;

    const foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.gridColumnStart = (food % gridSize) + 1;
    foodElement.style.gridRowStart = Math.floor(food / gridSize) + 1;
    gameBoard.appendChild(foodElement);
}

function stopGameLoop() {
    if (gameLoop !== null) {
        window.clearInterval(gameLoop);
        gameLoop = null;
    }
}

function finishGame(message) {
    isGameOver = true;
    stopGameLoop();

    const heading = gameOverScreen?.querySelector("h2");
    if (heading) heading.textContent = message;
    if (gameOverScreen) gameOverScreen.style.display = "block";
}

function checkGameOver() {
    const head = snakeBody[0];
    if (isWallCollision(head, direction, gridSize) || hasSelfCollision(snakeBody)) {
        finishGame("Game Over");
    }
}

function handleKeyPress(event) {
    const key = event.key;
    const isDirectionKey = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key);
    if (isDirectionKey) event.preventDefault();
    if (isGameOver) return;

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
    if (isGameOver) return;

    checkGameOver();
    if (!isGameOver) {
        drawSnake();
        drawFood();
    }
}

function startGame() {
    stopGameLoop();
    snakeBody = [2, 1];
    direction = 1;
    isGameOver = false;
    food = getRandomFoodPosition();

    const heading = gameOverScreen?.querySelector("h2");
    if (heading) heading.textContent = "Game Over";
    if (gameOverScreen) gameOverScreen.style.display = "none";

    drawSnake();
    drawFood();
    gameLoop = window.setInterval(main, TICK_MS);
}

if (gameBoard && gameOverScreen) {
    document.addEventListener("keydown", handleKeyPress);

    document.getElementById("up")?.addEventListener("click", () => {
        if (!isGameOver && direction !== gridSize) direction = -gridSize;
    });
    document.getElementById("down")?.addEventListener("click", () => {
        if (!isGameOver && direction !== -gridSize) direction = gridSize;
    });
    document.getElementById("left")?.addEventListener("click", () => {
        if (!isGameOver && direction !== 1) direction = -1;
    });
    document.getElementById("right")?.addEventListener("click", () => {
        if (!isGameOver && direction !== -1) direction = 1;
    });
    document.getElementById("restart")?.addEventListener("click", startGame);

    startGame();
}
