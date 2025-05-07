try {
    const data = await Deno.readTextFile("./input.txt");

    let totalPowerSum = 0;
    const lines = data.trim().split("\n");

    for (const line of lines) {
        if (!line.trim()) continue;

        const [gamePart, setsPart] = line.split(": ");
        // for the debuging if needed
        const gameId = parseInt(gamePart.split(" ")[1]);

        let minCubes = { red: 0, green: 0, blue: 0 };

        const sets = setsPart.split("; ");
        for (const set of sets) {
            const draws = set.split(", ");

            for (const draw of draws) {
                const [count, color] = draw.split(" ");
                const numCubes = parseInt(count);
                if (numCubes > minCubes[color]) {
                    minCubes[color] = numCubes;
                }
            }
        }

        const power = minCubes.red * minCubes.green * minCubes.blue;
        totalPowerSum += power;
    }

    console.log("Sum of game powers:", totalPowerSum);

} catch (err) {
    console.error("Error reading file:", err);
}

