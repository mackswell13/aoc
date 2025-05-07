console.log(performance.now());
const data = await Deno.readTextFile("./input.txt");
const lines = data.trim().split("\n");

let seeds = lines[0].split(" ");
seeds.shift();

const seed_numbers = seeds.map(Number);

console.log("seeds:", seed_numbers);

let t_count = 0;
const tables = {};
for (let i = 2; i < lines.length; i++) {
  if (lines[i] === "") {
    t_count += 1;
    continue;
  }
  if (lines[i].includes(":")) {
    continue;
  }
  if (tables[t_count]) {
    tables[t_count].push(lines[i]);
  } else {
    tables[t_count] = [lines[i]];
  }
}

for (let i = 0; i < t_count + 1; i++) {
  const temp = tables[i];
  const out = [];

  temp.forEach((line) => {
    const s = line.split(" ");
    out.push(s.map(Number));
  });

  out.sort((a, b) => {
    return a[1] - b[1]
  })

  tables[i] = out
}

// THIS GIVES LOCATION
/**
 * @param {any} seed
 * @returns {} 
 */
const seedMap = (seed) => {
  let s = seed;
  for (let j = 0; j < t_count + 1; j++) {
    const current_table = tables[j];

    for (let k = 0; k < current_table.length; k++) {
      const row = current_table[k];

      const min = row[1]
      const max = min + row[2]

      if (s >= min && s < max) {
        s += row[0] - row[1];
        break;
      }


    }
  }
  return s;
}

let minLocation = seedMap(seed_numbers[0]);
for (let i = 0; i < seed_numbers.length; i += 2) {
  const rangeStart = seed_numbers[i];
  const rangeLength = seed_numbers[i + 1];
  
  for (let seed = rangeStart; seed < rangeStart + rangeLength; seed++) {
    const location = seedMap(seed);
    
    if (location < minLocation) {
      minLocation = location;
    }
  }
}







console.log(minLocation);
console.log(performance.now());
