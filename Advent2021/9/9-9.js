let m = require('fs').readFileSync("./9/input.txt", "utf8").split("\n").map((e) => e.split('').map(n => +n));

function fb(m, r, c) {
    if (((m[r] ?? [])[c] ?? 9) >= 9) return 0;
    m[r][c] = 10;
    return 1 + fb(m, r - 1, c) + fb(m, r + 1, c) + fb(m, r, c - 1) + fb(m, r, c + 1);
}

let bs = [];
for (let r = 0; r < m.length; r++)
    for (let c = 0; c < m[r].length; c++) {
        if (m[r][c] < 9) {
            bs.push(fb(m, r, c));
        }
    }
let result = bs.sort((a, b) => b - a).splice(0, 3).reduce((p, c) => p * c, 1);
console.log(result);