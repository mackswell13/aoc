
const data = await Deno.readTextFile("./input.txt");
const lines = data.trim().split("\n");

const insructionSet = lines[0].trim();

const map = {};


for (let i = 2; i < lines.length; i ++) {
    const [key, L, R] = lines[i].split(/[^A-Z]+/);
    map[key] = { L: L, R: R };
}


let current = "AAA";
let count = 0;
let index = 0;
const max_index = insructionSet.length; 

while (current != "ZZZ") {
    current = map[current][insructionSet[index]];  
    count += 1;

    index += 1;
    if (index >= max_index) {
        index = 0;
    }

}

console.log(count);

