export function getRandomFreeCell(occupiedCells, totalCells, random = Math.random) {
  if (!Number.isInteger(totalCells) || totalCells < 1) {
    throw new TypeError("Total cell count must be a positive integer");
  }

  const occupied = new Set(
    Array.isArray(occupiedCells)
      ? occupiedCells.filter((cell) => Number.isInteger(cell) && cell >= 0 && cell < totalCells)
      : []
  );
  const freeCells = [];

  for (let cell = 0; cell < totalCells; cell += 1) {
    if (!occupied.has(cell)) freeCells.push(cell);
  }

  if (freeCells.length === 0) return null;

  const generatedRandom = random();
  const randomValue = Number.isFinite(generatedRandom) ? generatedRandom : 0;
  const safeRandom = Math.min(Math.max(randomValue, 0), 0.999999999);
  return freeCells[Math.floor(safeRandom * freeCells.length)];
}

export function isWallCollision(head, direction, gridSize) {
  const totalCells = gridSize * gridSize;
  return (
    !Number.isInteger(head) ||
    head < 0 ||
    head >= totalCells ||
    (direction === 1 && head % gridSize === 0) ||
    (direction === -1 && (head + 1) % gridSize === 0)
  );
}

export function hasSelfCollision(snakeBody) {
  return Array.isArray(snakeBody) && snakeBody.length > 1 &&
    snakeBody.slice(1).includes(snakeBody[0]);
}
