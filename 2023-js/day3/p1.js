const data = await Deno.readTextFile("./input.txt");
const lines = data.trim().split("\n");

const numbers = [];

lines.forEach((line, lineIndex) => {
  let regex = /\d+/g;
  let m;

  while ((m = regex.exec(line)) !== null) {
    numbers.push({
      line: lineIndex,
      index: m.index,
      value: parseInt(m[0], 10),
    });
  }
});

let count = 0;
numbers.forEach((n, idx) => {
  //console.log(n, idx);
  const adj = [];

  if (n.line != 0) {
    const prevLine = lines[n.line - 1];
    adj.push(
      prevLine.slice(
        Math.max(0, n.index - 1),
        Math.min(lines[0].length, n.index + n.value.toString().length + 1),
      ),
    );
  }

  if (n.line != lines.length - 1) {
    const nextLine = lines[n.line + 1];
    adj.push(
      nextLine.slice(
        Math.max(0, n.index - 1),
        Math.min(lines[0].length, n.index + n.value.toString().length + 1),
      ),
    );
  }

  adj.push(lines[n.line][Math.max(n.index - 1, 0)]);
  adj.push(
    lines[n.line][
      Math.min(n.index + n.value.toString().length, lines[0].length - 1)
    ],
  );

  const charArray = adj.reduce((acc, str) => {
    if (str) {
      return acc.concat(str.split(""));
    }
  }, []);


  if (charArray) {
    for (let i = 0; i < charArray.length; i++) {
      if (charArray[i] !== "." && isNaN(parseInt(charArray[i]))) {
        count += n.value;
        break;
      }
    }
  }

});

console.log(count);


