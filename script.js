const gameBoard = document.querySelector(".game");
const gridSize = 20;
const snakeBody = [2, 1]; // Snake body represented as [head, tail] indexes
let food = getRandomFoodPosition();
let direction = 1; // 1: right, -1: left, gridSize: down, -gridSize: up
let isGameOver = false;

function getRandomFoodPosition() {
  return Math.floor(Math.random() * gridSize * gridSize);
}

function updateSnake() {
  snakeBody.unshift(snakeBody[0] + direction);
  if (snakeBody[0] === food) {
    // The snake ate the food, so we increase its length by not removing the tail.
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
    alert("Game Over!");
    return;
  }

  updateSnake();
  checkGameOver();
  drawSnake();
  drawFood();

  setTimeout(main, 200); // Game loop - run the main function every 200ms
}

document.addEventListener("keydown", handleKeyPress);
main();
