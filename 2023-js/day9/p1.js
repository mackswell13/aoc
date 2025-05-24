
const data = await Deno.readTextFile("./input.txt");
const lines = data.trim().split("\n");

let out = 0;


for (let line = 0; line < lines.length; line++) {
    const history = lines[line].split(" ").map(Number);
    let recent_history = structuredClone(history); 
    let next_history = structuredClone(history);
    const histories = [history];

    let break_loop = false;
    while (!break_loop) {
        recent_history = structuredClone(next_history);
        next_history = []; 
        for (let i = 1; i < recent_history.length; i++) {
            next_history.push(recent_history[i] - recent_history[i-1]);
        }
        histories.push(next_history);
        if (next_history.every(e => e === 0)) {
            break_loop = true;
        }
    }

    for (let i = histories.length - 1; i > 0; i--) {
        const current = histories[i];
        const next = histories[i - 1];
        
        next.push(current[current.length-1] + next[next.length-1]);
    }

    out += histories[0][histories[0].length - 1];
};


console.log(out);

