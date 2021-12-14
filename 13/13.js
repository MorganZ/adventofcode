const lines = require('fs').readFileSync("./13/input.txt", "utf8").split("\n\n").map(l=>l.split("\n"));
let points = lines[0].map(l => l.split(",").map(c => +c));
let folds = lines[1].map(l => l.replace("fold along ", "").split('=')).map(([xy, f]) => [xy == 'x' ? 0 : 1, +f]);

for ([ax, seam] of folds) 
    for (let p of points) {
        if (p[ax] > seam)
            p[ax] = seam - (p[ax] - seam)
    }

var display = Array(50).fill(null).map((e) => Array(50).fill(' '));
points.forEach((pt)=> display[pt[1]][pt[0]] = "x");
display;