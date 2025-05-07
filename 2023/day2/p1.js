const BAG_LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

try {
  const data = await Deno.readTextFile("./input.txt");

  let sumOfValidGameIds = 0;
  const lines = data.trim().split("\n");

  for (const line of lines) {
    if (!line.trim()) continue;

    const [gamePart, setsPart] = line.split(": ");
    const gameId = parseInt(gamePart.split(" ")[1]);

    let gamePossible = true;

    const sets = setsPart.split("; ");
    for (const set of sets) {
      const draws = set.split(", ");

      for (const draw of draws) {
        const [count, color] = draw.split(" ");
        if (parseInt(count) > BAG_LIMITS[color]) {
          gamePossible = false;
          break;
        }
      }

      if (!gamePossible) break;
    }

    if (gamePossible) {
      sumOfValidGameIds += gameId;
    }
  }

  console.log("Sum of possible game IDs:", sumOfValidGameIds);
} catch (err) {
  console.error("Error reading file:", err);
}
