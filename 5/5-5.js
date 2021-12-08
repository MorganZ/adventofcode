const fs = require('fs')
fs.readFile("./5/5.txt", "utf8", function (err, data) {
    let m = [];
    let l = data.split("\n").map(el => el.replace(" -> ", ",").split(",").map(c => parseInt(c)));
    for (let index = 0; index < l.length; index++) {
        let [x1, y1, x2, y2] = l[index];
        const [incx, incy] = [Math.sign(x2 - x1), Math.sign(y2 - y1)];
        for (let x = x1, y = y1; x != x2 + incx || y != y2 + incy; x += incx, y += incy) {
            m[`${x}-${y}`] = (m[`${x}-${y}`] ?? 0) + 1;
        }
    }
    console.log(Object.values(m).filter((value) => value > 1).length);
});