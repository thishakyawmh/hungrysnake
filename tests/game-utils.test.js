import test from "node:test";
import assert from "node:assert/strict";
import { getRandomFreeCell, hasSelfCollision, isWallCollision } from "../game-utils.js";

test("food is placed only on an unoccupied board cell", () => {
  assert.equal(getRandomFreeCell([0, 1], 5, () => 0), 2);
  assert.equal(getRandomFreeCell([0, 1], 5, () => 0.999), 4);
});

test("returns null when the snake occupies every cell", () => {
  assert.equal(getRandomFreeCell([0, 1, 2], 3, () => 0), null);
});

test("rejects invalid board sizes", () => {
  assert.throws(() => getRandomFreeCell([], 0), TypeError);
});

test("detects horizontal wall wrapping and out-of-bounds movement", () => {
  assert.equal(isWallCollision(20, 1, 20), true);
  assert.equal(isWallCollision(19, -1, 20), true);
  assert.equal(isWallCollision(-1, -20, 20), true);
  assert.equal(isWallCollision(21, 20, 20), false);
});

test("detects self collision", () => {
  assert.equal(hasSelfCollision([5, 4, 3, 5]), true);
  assert.equal(hasSelfCollision([5, 4, 3]), false);
});
