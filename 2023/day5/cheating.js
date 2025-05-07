console.log(performance.now());
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { readFileSync } from "fs";

if (isMainThread) {
  const data = readFileSync("./input.txt", "utf-8");
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
    const out = temp.map(line => line.split(" ").map(Number));
    out.sort((a, b) => a[1] - b[1]);
    tables[i] = out;
  }

  let minLocation = Infinity;
  const workers = [];
  const workerCount = Math.min(6, seed_numbers.length / 2); // Limit thread count

  for (let i = 0; i < seed_numbers.length; i += 2) {
    const rangeStart = seed_numbers[i];
    const rangeLength = seed_numbers[i + 1];
    const chunkSize = Math.ceil(rangeLength / workerCount);
    
    for (let w = 0; w < workerCount; w++) {
      const start = rangeStart + w * chunkSize;
      const end = Math.min(rangeStart + rangeLength, start + chunkSize);

      workers.push(
        new Promise((resolve) => {
          const worker = new Worker(import.meta.url, {
            workerData: { start, end, tables, t_count }
          });
          worker.on("message", (location) => {
            minLocation = Math.min(minLocation, location);
            resolve();
          });
          worker.on("error", (err) => console.error("Worker error:", err));
        })
      );
    }
  }

  await Promise.all(workers);
  console.log(minLocation);
  console.log(performance.now());
} else {
  const { start, end, tables, t_count } = workerData;

  function seedMap(seed) {
    let s = seed;
    for (let j = 0; j < t_count + 1; j++) {
      const current_table = tables[j];
      for (let k = 0; k < current_table.length; k++) {
        const row = current_table[k];
        const min = row[1];
        const max = min + row[2];
        if (s >= min && s < max) {
          s += row[0] - row[1];
          break;
        }
      }
    }
    return s;
  }

  let localMin = Infinity;
  for (let seed = start; seed < end; seed++) {
    localMin = Math.min(localMin, seedMap(seed));
  }

  parentPort.postMessage(localMin);
}

