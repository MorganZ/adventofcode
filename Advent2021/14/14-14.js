const [[mol], rules_] = require('fs').readFileSync("./14/input.txt", "utf8").split("\n\n").map(l => l.split("\n"));
let rules = Object.fromEntries(rules_.map((op) => op.split(" -> ")).map(([s, r]) => [s, [s[0] + r, r + s[1]]]));
let init =  Object.entries(rules).map(([s, r]) => [s, 0]);
let mapCount = Object.fromEntries(init);
[...mol].map((_, i) => mol.substring(i, i + 2)).forEach(k => mapCount[k] = (mapCount[k] ?? 0) + 1);

for (let step = 0; step < 40; step++) {
    let tempMapCount = Object.fromEntries(init);
    for (let [bi, count] of Object.entries(mapCount)) {
        if (!rules[bi]) rules[bi] = [bi];
        for (let bic of rules[bi]) tempMapCount[bic] = (tempMapCount[bic] ?? 0) + count;
    }
    mapCount = tempMapCount;
}

let result = Object.values(Object.entries(mapCount)
    .reduce((p, [k, c]) => (p[k[0]] = (p[k[0]] ?? 0) + c, p), {}));
console.log(Math.max(...result) - Math.min(...result))