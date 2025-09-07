const gameBoard = document.querySelector(".game");
const gridSize = 20;
let snakeBody = [2, 1]; // Snake body represented as [head, tail] indexes
let food = getRandomFoodPosition();
let direction = 1; // 1: right, -1: left, gridSize: down, -gridSize: up
let isGameOver = false;
let gameLoop;

function getRandomFoodPosition() {
  return Math.floor(Math.random() * gridSize * gridSize);
}

function updateSnake() {
  snakeBody.unshift(snakeBody[0] + direction);
  if (snakeBody[0] === food) {
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
  if (
    snakeBody[0] >= gridSize * gridSize ||
    snakeBody[0] < 0 ||
    snakeBody.slice(1).includes(snakeBody[0])
  ) {
    isGameOver = true;
    document.querySelector('.game-over-screen').style.display = 'block';
    clearInterval(gameLoop);
  }
}

function handleKeyPress(event) {
  if (event.key === "ArrowUp" && direction !== gridSize) {
    direction = -gridSize;
  } else if (event.key === "ArrowDown" && direction !== -gridSize) {
    direction = gridSize;
  } else if (event.key === "ArrowLeft" && direction !== 1) {
    direction = -1;
  } else if (event.key === "ArrowRight" && direction !== -1) {
    direction = 1;
  }
}

function main() {
  if (isGameOver) {
    return;
  }

  updateSnake();
  checkGameOver();
  drawSnake();
  drawFood();
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
