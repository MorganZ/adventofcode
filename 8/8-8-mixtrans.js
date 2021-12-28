let lines = require('fs').readFileSync('./8/input.txt', 'utf-8').split('\n');

let possibles = "abcdefg";
const m0to9 = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"]

let result = 0;
for (let line of lines) {
    let [p10, p4] = line.split(" | ");
    let letterByCount = Object.fromEntries(Object.entries(p10.split(" ").join('').split("").reduce((p, c) => (p[c] = (p[c] ?? 0) + 1, p), {})).map(m => m.reverse()));
    let e = letterByCount[4], b = letterByCount[6], f = letterByCount[9]; // by unique count
    let p10_sorted = p10.split(" ").map(c => new Set(c.split(''))).sort((a, b) => a.size - b.size); // by script number size
    let [cf, a, bd, eg] = [p10_sorted[0], p10_sorted[1], p10_sorted[2], p10_sorted[p10_sorted.length - 1]];
    [...cf].forEach(e => (a.delete(e), bd.delete(e), eg.delete(e)));
    [...bd, ...a].forEach(e => eg.delete(e));
    a = [...a][0];
    cf.delete(f);
    let c = [...cf][0];
    bd.delete(b);
    let d = [...bd][0];
    eg.delete(e);
    let g = [...eg][0];
    let transl = Object.fromEntries(([a, b, c, d, e, f, g].map((e, i) => [e, possibles[i]])));
    result += parseInt(p4.split(" ").map(ch => m0to9.indexOf([...ch].map(c => transl[c]).sort().join(""))).join(''));
}
console.log(result);