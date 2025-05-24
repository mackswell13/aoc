const data = await Deno.readTextFile("./input.txt");
const lines = data.trim().split("\n");

const height = lines.length;
const width = lines[0].length;

const procInput = (lines) => {
  const gearLocations = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (lines[i][j] === "*") {
        gearLocations.push({ y: i, x: j });
      }
    }
  }

  let total = 0;

  for (const { x, y } of gearLocations) {
    const adj = getAdjacentNumbers(lines, x, y);

    if (adj.length === 2) {
      total += adj[0] * adj[1];
    }
  }

  console.log(total);
};

const getAdjacentNumbers = (lines, x, y) => {
  const height = lines.length;
  const width = lines[0].length;
  const numbers = new Set();
  const visited = new Set();

  const extractNumber = (row, col) => {
    if (
      visited.has(`${row},${col}`) ||
      row < 0 ||
      row >= height ||
      col < 0 ||
      col >= width ||
      !/\d/.test(lines[row][col])
    ) {
      return null;
    }
    visited.add(`${row},${col}`);

    let start = col;
    while (start > 0 && /\d/.test(lines[row][start - 1])) {
      start--;
    }

    let end = col;
    while (end < width - 1 && /\d/.test(lines[row][end + 1])) {
      end++;
    }

    const num = lines[row].slice(start, end + 1);
    return parseInt(num, 10);
  }

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      const num = extractNumber(ny, nx); // Swap (x, y) -> (col, row)
      if (num !== null) numbers.add(num);
    }
  }

  return [...numbers];
};

procInput(lines);
