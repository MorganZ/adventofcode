const fs = require('fs');
//var f = (i)=> i == 1 ? 1 : f(i - 1) + i;
const f = (n) => (n * (n + 1) / 2);

let l = fs.readFileSync("./7/input.txt", "utf8").split(",").map(s => parseInt(s)).sort((a, b) => a - b);

let map = l.reduce((p, c) => {
    p[c] = (p[c] ?? 0) + 1;
    return p;
}, {});

let currentCost = Number.MAX_VALUE;
for (let pos = 0; pos <= l[l.length - 1]; pos++) {
    let cost = [...Object.entries(map)].reduce((c, [position, count]) => c + f(Math.abs(pos - parseInt(position))) * count, 0);
    if (cost < currentCost) currentCost = cost;
}
console.log(currentCost);