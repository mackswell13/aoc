const readFileIntoArray = async (filePath) => {
  const content = await Deno.readTextFile(filePath);
  return content.split("\n");
};

const isDigit = (char) => char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;

const convertToNumber = (s) => {
  switch (s.toLowerCase()) {
    case "one": return 1;
    case "two": return 2;
    case "three": return 3;
    case "four": return 4;
    case "five": return 5;
    case "six": return 6;
    case "seven": return 7;
    case "eight": return 8;
    case "nine": return 9;
    default: return parseInt(s);
  }
};

const wordDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const findAllDigits = (line) => {
  const digits = [];
  
  for (let i = 0; i < line.length; i++) {
    if (isDigit(line[i])) {
      digits.push({
        position: i,
        value: parseInt(line[i])
      });
    }
  }
  
  for (let i = 0; i < wordDigits.length; i++) {
    const word = wordDigits[i];
    let pos = line.indexOf(word);
    
    while (pos !== -1) {
      digits.push({
        position: pos,
        value: i + 1
      });
      pos = line.indexOf(word, pos + 1);
    }
  }
  
  digits.sort((a, b) => a.position - b.position);
  
  return digits;
};

const calculateCalibrationValue = (line) => {
  if (!line.trim()) return 0;
  
  const digits = findAllDigits(line);
  if (digits.length === 0) return 0;
  
  const firstDigit = digits[0].value;
  const lastDigit = digits[digits.length - 1].value;
  
  return firstDigit * 10 + lastDigit;
};

async function main() {
  try {
    const filePath = "./i1.txt";
    const lines = await readFileIntoArray(filePath);
    
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim()) {
        const value = calculateCalibrationValue(lines[i]);
        console.log(`Line ${i+1}: "${lines[i]}" => ${value}`);
        sum += value;
      }
    }
    
    console.log(`\nSum of all calibration values: ${sum}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
