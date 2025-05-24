const data = await Deno.readTextFile("./input.txt");
const lines = data.trim().split("\n");

const hand_values = [];

const mapping = {
  A: 0xe,
  K: 0xd,
  Q: 0xc,
  T: 0xa,
  J: 0x0,
};

const generateHandValue = (prefix, hand) => {
  let hexString = prefix;
  for (let char of hand) {
    hexString +=
      mapping[char] !== undefined ? mapping[char].toString(16) : char;
  }

  return Number('0x' + hexString.toUpperCase());
};

const generatePrefix = (struct) => {
  const js = struct["J"];
  struct["J"] = 0;
  const vals = Object.values(struct);
  vals.sort();
  vals.reverse();
  if (js) vals[0] += js;
  switch (vals[0]) {
    case 5:
      return 0x7;
    case 4:
      return 0x6;
    case 3:
      if (vals[1] == 2) {
        return 0x5;
      }
      return 0x4;
    case 2:
      if (vals[1] == 2) {
        return 0x3;
      }
      return 0x2;
    default:
      return 0x1;
  }
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].split(" ");

  const struct = {};

  line[0].split("").forEach((char) => {
    if (struct[char]) {
      struct[char] += 1;
    } else {
      struct[char] = 1;
    }
  });

  hand_values.push({strength:  generateHandValue(generatePrefix(struct), line[0]), value: line[1]});
}

hand_values.sort((a, b) => {
  return a.strength - b.strength
});

let total = 0;
for (let i = 0; i < hand_values.length; i++) {
  total += (i+1) * Number(hand_values[i].value);
}

console.log(hand_values);
console.log(total);
