let l = require('fs').readFileSync("./7/input.txt", "utf8").split(",").map(s => +s).sort((a, b) => a - b);
const distanceCost = (n) => (n * (n + 1) / 2);

let map = [...Object.entries(l.reduce((p, c) => (p[c] = (p[c] ?? 0) + 1, p), {}))];
let xAvg = Math.floor(map.reduce((p, c) => p + c[0] * c[1], 0) / l.length);
let cost = map.reduce((acc, [xcrab, nbCrabs]) => acc + distanceCost(Math.abs(xAvg - xcrab)) * nbCrabs, 0);

console.log(cost);