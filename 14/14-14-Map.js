let [[mol], rules] = require('fs').readFileSync("./14/input.txt", "utf8").split("\n\n").map(l => l.split("\n"));
rules = new Map(rules.map((op) => op.split(" -> ")).map(([s, r]) => [s, [s[0] + r, r + s[1]]]));
let pairCount = new Map([...rules.keys()].map(k => [k, 0]));
[...mol].map((_, i) => mol.substring(i, i + 2)).forEach(k => pairCount.set(k, (pairCount.get(k) ?? 0) + 1));

for (let step = 0; step < 40; step++) {
    let nextPairCount = new Map([...pairCount.keys()].map(k => [k, 0]));
    for (let [bi, count] of pairCount.entries()) {
        if (!rules.get(bi)) rules.set(bi, [bi]);
        rules.get(bi).forEach(bic => nextPairCount.set(bic, nextPairCount.get(bic) + count));
    }
    pairCount = nextPairCount;
}

let scores = Object.values([...pairCount.entries()]
    .reduce((p, [k, v]) => (p[k[0]] = (p[k[0]] ?? 0) + v, p), {}));
console.log(Math.max(...scores) - Math.min(...scores))