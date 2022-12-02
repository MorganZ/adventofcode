const lines = require('fs').readFileSync("./13/input.txt", "utf8").split("\n\n").map(l => l.split("\n"));
let points = lines[0].map(l => l.split(",").map(c => +c));
let folds = lines[1].map(l => l.replace("fold along ", "").split('=')).map(([xy, f]) => [xy == 'x' ? 0 : 1, +f]);

for (let [axe, seam] of folds) {
    for (let p of points) {
        if (p[axe] > seam)
            p[axe] = seam - (p[axe] - seam)
    }
    break;
}
let ps = [... new Set(points.map(p => p.join(',')))].map(p => p.split(',').map(c => +c));
console.log(ps.length);