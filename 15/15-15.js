const lines = require('fs').readFileSync("./15/input.txt", "utf8").split("\n").map(l => l.split("").map(e => +e))

let visited = new Map();
let adjs = [[-1, 0], [0, -1], [0, 1], [1, 0]];
visited.set(`${0}-${0}`, { c: 0 });
let score = Number.MAX_SAFE_INTEGER;
var end = lines.length * 5;//new
var previous = 0;
while (previous != score) {
    previous = score;
    for (let y = 0; y < end; y++) {
        let sy = (y - (y % 100)) / 100;//new 
        for (let x = 0; x < end; x++) {
            let sx = (x - (x % 100)) / 100;//new
            if (x == 0 && y == 0) continue;
            let cost = ((lines[x % 100][y % 100] + sx + sy - 1) % 9) + 1;//new
            let ovisited = visited.get(`${x}-${y}`);
            if (!ovisited) {
                ovisited = { c: Number.MAX_SAFE_INTEGER };
                visited.set(`${x}-${y}`, ovisited);
            }
            let neighbours = adjs.map(([dx, dy]) => [x + dx, y + dy]);
            for (let [nx, ny] of neighbours) {
                let nvisited = visited.get(`${nx}-${ny}`);
                if (nvisited) {
                    let newCost = cost + nvisited.c;
                    if (newCost <= ovisited.c) {
                        ovisited.c = newCost
                        ovisited.p = `${nx}-${ny}`
                    }
                }
            }
        }
    }
    score = visited.get((end - 1) + '-' + (end - 1)).c;
}
console.log(score);