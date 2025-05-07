
const data = await Deno.readTextFile("./input.txt");
const lines = data.trim().split("\n");

const times = lines[0].match(/\d+/g)?.map(Number);
const distances = lines[1].match(/\d+/g)?.map(Number);

console.log(times, distances);

const totals = [];

for (let i = 0; i < times.length; i++) {

  const outs = [];
  for (let j = 0; j < times[i]; j++) {
    const time = j * (times[i] - j)
    if (time > distances[i])
      outs.push(time);
  }
  
  totals.push(outs.length);
}

console.log(totals)

console.log(totals.reduce((acc, curr) => acc * curr, 1))
