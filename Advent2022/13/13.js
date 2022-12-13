const input = require('fs').readFileSync('./13/input.txt', 'utf-8');
const signals = input.split("\n\n").map(s => s.split("\n").map(p => JSON.parse(p)));

const compareSignal = (s1, s2) => {
    if (Number.isInteger(s1) && Number.isInteger(s2)) return s2 - s1;
    if (Array.isArray(s1) && Array.isArray(s2))
        for (let i=0; i<=s1.length  || i<=s2.length ; i++) {
            let a = s1[i] ?? -1;
            let b = s2[i] ?? -1;
            const result = compareSignal(a, b);
            if (result != 0) return result;
        }
    if (Number.isInteger(s1)) return compareSignal([s1], s2);
    if (Number.isInteger(s2)) return compareSignal(s1, [s2]);
    return 0;
}
const result = signals.map((s, i) => [i, 0 < compareSignal(s[0], s[1])])
    .filter(s => s[1]).map(s => s[0])
    .reduce((a, b) => a + b + 1, 0);
console.log(result);
