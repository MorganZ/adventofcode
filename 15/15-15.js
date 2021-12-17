const lines = require('fs').readFileSync("./15/input.txt", "utf8").split("\n").map(l => l.split("").map(e => +e))

let visited = new Map();
let adjs = [[-1, 0], [0, -1], [0, 1], [1, 0]];
visited.set(`${0}-${0}`, { c: 0 });
let score = Number.MAX_SAFE_INTEGER;
var end = lines.length * 5;
var previous = 0;
while (previous != score) {
    previous = score;
    for (let y = 0; y < end; y++) {
        let sy = (y - (y % 100)) / 100;
        for (let x = 0; x < end; x++) {
            let sx = (x - (x % 100)) / 100;
            if (x == 0 && y == 0) continue;
            let cost = ((lines[x % 100][y % 100] + sx + sy - 1) % 9) + 1;
            if (!visited.get(`${x}-${y}`)) {
                visited.set(`${x}-${y}`, { c: Number.MAX_SAFE_INTEGER });
            }
            let neighbours = adjs.map(([dx, dy]) => [x + dx, y + dy]);
            for (let [nx, ny] of neighbours) {
                let nvisited = visited.get(`${nx}-${ny}`);
                let ovisited = visited.get(`${x}-${y}`);
                if (nvisited) {
                    let newCost = cost + nvisited.c;
                    if (newCost <= ovisited.c) visited.set(`${x}-${y}`, { c: newCost, p: `${nx}-${ny}` })
                }
            }
        }
    }

    score = visited.get((end - 1) + '-' + (end - 1)).c;
    console.log(score);
}

console.log(score);