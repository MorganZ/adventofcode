function flash(l, r, c) {
    if (((l[r] ?? [])[c] ?? -1) == -1) return 0;
    l[r][c] += 1;
    if (l[r][c] == 10) {
        l[r][c] = -1;
        return 1 + flash(l, r - 1, c) + flash(l, r + 1, c) + flash(l, r, c - 1) + flash(l, r, c + 1) +
        flash(l, r - 1, c - 1) + flash(l, r - 1, c + 1) + flash(l, r + 1, c - 1) + flash(l, r + 1, c + 1);
    }
    return 0;
}
let l = require('fs').readFileSync("./11/input.txt", "utf8").split("\n").map((e) => e.split('').map(n => parseInt(n)));
let turn = 0;
for (let sum = 0; sum < 100; turn++) {
    sum = 0;
    for (let r = 0; r < l.length; r++) {
        for (let c = 0; c < l[r].length; c++) {
            sum += flash(l, r, c);
        }
    }
    for (let r = 0; r < l.length; r++) {
        for (let c = 0; c < l[r].length; c++) {
            if (l[r][c] == -1) l[r][c] = 0;
        }
    }
}
console.log(turn);