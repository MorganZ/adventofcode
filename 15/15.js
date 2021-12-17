const lines = require('fs').readFileSync("./15/input.txt", "utf8").split("\n").map(l => l.split("").map(e => +e))

let visited = new Map();
let adjs = [[-1, 0], [0, -1]];
visited.set(`${0}-${0}`, { c: 0 });
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines.length; x++) {
        if (x == 0 && y == 0) continue;
        const cost = lines[x][y];
        visited.set(`${x}-${y}`, { c: Number.MAX_SAFE_INTEGER });
        let neighbours = adjs.map(([dx, dy]) => [x + dx, y + dy]);
        for (let [nx, ny] of neighbours) {
            let nvisited = visited.get(`${nx}-${ny}`);
            let ovisited = visited.get(`${x}-${y}`);
            if (nvisited) {
                let newCost = cost + nvisited.c;
                if (newCost < ovisited.c) visited.set(`${x}-${y}`, { c: newCost, p: `${nx}-${ny}` })
            }
        }
    }
}
//debug
let current = visited.get((lines.length - 1) + '-' + (lines[0].length - 1));
while (current.p) {
    console.log(current.c + " " + current.p);
    current = visited.get(current.p);
}
//debug
console.log(current.c);