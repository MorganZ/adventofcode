const lines = require('fs').readFileSync("./14/input.txt", "utf8").split("\n\n").map(l => l.split("\n"));
let mol = lines[0][0];
let operationp = Object.fromEntries(lines[1].map((op) => op.split(" -> ")).map(([s, r]) => [s, s[0] + r]));

for (let step = 0; step < 10; step++) {
    let nextMol = "";
    for (let pos = 0; pos < mol.length - 1; pos++) {
        nextMol += operationp[mol[pos] + mol[pos + 1]] ?? current[0];
    }
    mol = nextMol + mol[mol.length - 1];
}

let result = Object.values([...mol].reduce((p, c) => {
    p[c] ? (p[c] += 1) : (p[c] = 1);
    return p;
}, {}))

console.log(Math.max(...result) - Math.min(...result))