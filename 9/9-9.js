
var fs = require('fs')


function fb(l, r, c) {
    if (((l[r] ?? [])[c] ?? 9 )>= 9) {
        return 0;
    }
    l[r][c] = 10;
    return 1 + fb(l, r - 1, c) + fb(l, r + 1, c) + fb(l, r, c - 1) + fb(l, r, c+1);
}

fs.readFile("./9/input.txt", "utf8", function (err, data) {
    let l = data.split("\n").map((e) => e.split('').map(n => parseInt(n)));
    let bs = [];
    for (let r = 0; r < l.length; r++) {
        const row = l[r];
        for (let c = 0; c < row.length; c++) {
            if (l[r][c] < 9) {
                bs.push(fb(l, r, c));
            }
        }
    }
    var result = bs.sort((a,b)=>b-a).splice(0,3).reduce((p,c)=>p*c, 1);
    console.log(result);
});
