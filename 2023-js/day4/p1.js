const data = await Deno.readTextFile("./input.txt");
const lines = data.trim().split("\n");

console.log(lines.length);

let mega_count = 0;
for (let i = 0; i < lines.length; i++) {
  let sides = lines[i].split(/[\|:]/);


  const side_1 = sides[1].split(' ');
  const side_2 = sides[2].split(' ');

  const winners = new Set(side_2);

  console.log(side_1, side_2)

  let count = 0;
  for (let j = 0; j < side_1.length; j++) {
    if (side_1[j] !== "") {
      if (winners.has(side_1[j])) {
        count += 1;
      }
    }
  }


  if (count !== 0) {
    mega_count += 2 ** (count - 1);
  }
}

console.log(mega_count);
