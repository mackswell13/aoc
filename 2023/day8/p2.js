
const data = await Deno.readTextFile("./input.txt");
const lines = data.trim().split("\n");

const insructionSet = lines[0].trim();

const map = {};

const startingNodes = [];

for (let i = 2; i < lines.length; i ++) {
    const [key, L, R] = lines[i].split(/[^A-Z]+/);
    map[key] = { L: L, R: R };

    if (key[2] === 'A') {
        startingNodes.push(key);
    }
}

const mul = [];
for (let i = 0; i < startingNodes.length; i++) {
    let current = startingNodes[i];
    let count = 0;
    let index = 0;
    const max_index = insructionSet.length; 

    while (current[2] !== 'Z') {
        current = map[current][insructionSet[index]];  
        
        count += 1;
        index += 1;
        if (index >= max_index) {
            index = 0;
        }
    }

    mul.push(count);
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function lcmArray(arr) {
  if (!arr || arr.length === 0) {
    return 1;
  }
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = lcm(result, arr[i]);
  }
  return result;
}

console.log(lcmArray(mul));


console.log(mul);


