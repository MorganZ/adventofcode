var fs = require('fs')

fs.readFile("./9/input.txt", "utf8", function (err, data) {
    let l = data.split("\n").map((e) => e.split('').map(n => parseInt(n)));
    let sum = 0;
    for (let r = 0; r < l.length; r++) {
        for (let c = 0; c < l[r].length; c++) {
            let adjacent = [(l[r - 1] ?? [])[c] ?? 9, (l[r + 1] ?? [])[c] ?? 9, (l[r] ?? [])[c - 1] ?? 9, (l[r] ?? [])[c + 1] ?? 9]
            var isLower = adjacent.reduce((p, c) => p && c > l[r][c], true);
            sum += isLower ? l[r][c] + 1 : 0;
        }
    }
    console.log(sum);
});
