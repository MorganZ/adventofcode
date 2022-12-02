let data = require('fs').readFileSync("./17/input.txt", "utf8");
[[xmin, xmax], [ymin, ymax]] = data.slice(13, data.length).split(', ').map(c => c.split("=")[1].split('..').map(c => +c));

let xstart = Math.floor(Math.sqrt(xmin * 2));

let win = new Set();
for (let xv = xstart; xv <= xmax; xv++)
    for (let yv = ymin, y_max = Math.abs(ymin + 1); yv <= y_max; yv++) {
        let [xvc, yvc] = [xv, yv];
        let stepMin = Math.ceil(xmin / xv);
        for (let step = stepMin, x = 0, y = 0; x <= xmax && ymin <= y; step++) {
            [x, y] = [x + xvc, y + yvc];
            [xvc, yvc] = [xvc - Math.sign(xvc), yvc - 1]
            if (xmin <= x && x <= xmax && ymin <= y && y <= ymax) {
                win.add(xv + ',' + yv)
            }
        }
    }

console.log(win.size);