const fs = require('fs');

const input = fs.readFileSync("./13/input.txt", "utf8");
const lines = input.split("\r\n")

let points = lines.filter(l => !l.startsWith("f") && l)
    .map(l => l.split(",").map(coord => parseInt(coord)));
let folds = lines.filter(l => l.startsWith("f") && l)
    .map(l => l.replace("fold along ", "").split('=')).map(([axis, foldPos]) => [axis, parseInt(foldPos)]);
for ([axis, foldPos] of folds) {
    switch (axis) {
        case 'x':
            for (let p = 0; p < points.length; p++) {
                const point = points[p][0];
                if(point > foldPos)
                    points[p][0] = foldPos-(points[p][0]-foldPos)
            }
            break;
        case 'y':
            for (let p = 0; p < points.length; p++) {
                const point = points[p][1];
                if(point > foldPos)
                    points[p][1] = foldPos-(points[p][1]-foldPos)
            }
            break;
    }
}

var t = new Set(points.map(p=>p.join('-')));

console.log(points);