// 7! = 5040 possible variation if we can reduce to 9 possible variation

let lines = require('fs').readFileSync('./8/input.txt', 'utf-8').split('\n');

const m0to9 = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"]
const baseS = "aaaaaaaabbbbbbccccccccdddddddeeeefffffffffggggggg";

console.log(baseS)
let result = 0;
for (let line of lines) {
    let [p10, p4] = line.split(" | ");
    let p10_sorted = p10.split(" ").map(c => new Set(c.split(''))).sort((a, b) => a.size - b.size);
    let [cf, a, bd, eg] = [p10_sorted[0], p10_sorted[1], p10_sorted[2], p10_sorted[p10_sorted.length - 1]];
    [...cf].forEach(e => (a.delete(e), bd.delete(e), eg.delete(e)));
    [...bd, ...a].forEach(e => eg.delete(e));
    a = [...a], cf = [...cf], bd = [...bd], eg = [...eg];

    for (let n = 0; n < 8; n++) {
        let p = n.toString(2).padStart(3, '0').split('').map(e => +e);
        let transl = Object.fromEntries([[a[0], "a"], [bd[p[0]], "b"], [cf[p[1]], "c"], [bd[p[0] ^ 1], "d"], [eg[p[2]], "e"], [cf[p[1] ^ 1], "f"], [eg[p[2] ^ 1], "g"]]);
        let transBaseS = p10.split('').map(e => transl[e] ?? " ").sort().join('').replace(/ /g, '');

        if (baseS == transBaseS) {
            result += parseInt(p4.split(" ").map(ch => m0to9.indexOf([...ch].map(c => transl[c]).sort().join(""))).join(''));
        }
    }
}
console.log(result);