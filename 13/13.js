const fs = require('fs');
const input = fs.readFileSync("./13/input.txt", "utf8");
const lines = input.split("\r\n")

let points = lines.filter(l => !l.startsWith("f") && l)
    .map(l => l.split(",").map(coord => parseInt(coord)));
let folds = lines.filter(l => l.startsWith("f") && l)
    .map(l => l.replace("fold along ", "").split('=')).map(([axis, foldPos]) => [axis, parseInt(foldPos)]);

for ([axis, foldPos] of folds) {
    for (let p = 0; p < points.length; p++) {
        ax = axis == "x" ? 0 : 1;
        if (points[p][ax] > foldPos)
            points[p][ax] = foldPos - (points[p][ax] - foldPos)
    }
}

var t = [... new Set(points.map(p => p.join(',')))].map(p => p.split(',').map(c => parseInt(c)));

var array = new Array(100);
for (let i = 0; i < 100; i++)  array[i] = new Array(100).fill(' ');
for (let i = 0; i < t.length; i++)  array[t[i][1]][t[i][0]] = "x";

console.log(array);