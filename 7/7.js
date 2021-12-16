let l = require('fs').readFileSync("./7/input.txt", "utf8").split(",").map(s => parseInt(s)).sort((a, b) => a - b);
let mediane = (l.length - 1) / 2;
let destination = mediane % 1 == 0 ? l[mediane] : (l[mediane - 0.5] + l[mediane - 0.5]) / 2;
let energy = 0;
for (let i = 0; i < l.length; i++) {
    energy += Math.abs(l[i] - destination);
}

console.log(energy);