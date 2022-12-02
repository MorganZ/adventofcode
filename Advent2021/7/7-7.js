let l = require('fs').readFileSync("./7/input.txt", "utf8").split(",").map(s => +s).sort((a, b) => a - b);
const distanceCost = (n) => (n * (n + 1) / 2);//let f = (i)=> i == 1 ? 1 : f(i - 1) + i;

let map = l.reduce((p, c) => (p[c] = (p[c] ?? 0) + 1, p), {});

let cost = Number.MAX_VALUE;
for (let x = 0, max = l[l.length-1]; x <= max; x++) {
    let crabCost = [...Object.entries(map)].reduce((acc, [xcrab, nbCrabs]) => acc + distanceCost(Math.abs(x - xcrab)) * nbCrabs, 0);
    if (crabCost < cost) cost = crabCost;
}
console.log(cost);