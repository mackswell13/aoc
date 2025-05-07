
const readFileIntoArray = async (filePath) => {
  const content = await Deno.readTextFile(filePath);
  return content.split("\n"); 
};

const isNumber = (char) => char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;

const filePath = "./i1.txt"; 
const lines = await readFileIntoArray(filePath);

let out = 0;
for (let i = 0; i < lines.length - 1; i ++) {
  let n = "";
  const nums = lines[i].match(/\d+/g);

  n = nums[0][0] + nums[nums.length-1][nums[nums.length-1].length-1];

  console.log(n);
  out += Number(n);
}

console.log(out);


