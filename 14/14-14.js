const lines = require('fs').readFileSync("./14/input.txt", "utf8").split("\n\n").map(l => l.split("\n"));
let mol = [...lines[0][0], '_']; // tricks
let map = Object.fromEntries(lines[1].map((op) => op.split(" -> ")).map(([s, r]) => [s, [s[0] + r, r + s[1]]]));
let init = lines[1].map((op) => op.split(" -> ")).map(([s, r]) => [s, 0]);
let mapCount = Object.fromEntries(init);

for (let i = 0; i <= mol.length - 2; i++) {
    mapCount[mol[i] + mol[i + 1]] = (mapCount[mol[i] + mol[i + 1]] ?? 0) + 1;
}
for (let step = 0; step < 40; step++) {
    let tempMapCount = Object.fromEntries(init);
    for (let [bi, count] of Object.entries(mapCount)) {
        if (!map[bi]) map[bi] = [bi];
        for (let bic of map[bi]) {
            tempMapCount[bic] = (tempMapCount[bic] ?? 0) + count;
        }
    }
    mapCount = tempMapCount;
}

let result = Object.values(Object.entries(mapCount).reduce((p, [key, count]) => {
    p[key[0]] = (p[key[0]] ?? 0) + count;
    return p
}, {}));

console.log(Math.max(...result) - Math.min(...result))

console.log("test");