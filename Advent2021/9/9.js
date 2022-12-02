const m = require('fs').readFileSync("./9/input.txt", "utf8").split("\n").map((e) => e.split('').map(n => +n));
let sum = 0;
for (let r = 0; r < m.length; r++) {
    for (let c = 0; c < m[r].length; c++) {
        let adjacent = [(m[r - 1] ?? [])[c] ?? 9, (m[r + 1] ?? [])[c] ?? 9, (m[r] ?? [])[c - 1] ?? 9, (m[r] ?? [])[c + 1] ?? 9]
        let isLower = adjacent.reduce((p, c) => p && c > m[r][c], true);
        sum += isLower ? m[r][c] + 1 : 0;
    }
}
console.log(sum);