//not working solution
let lines = require('fs').readFileSync('./22/input.txt', 'utf-8').split('\n');
let boundingBoxes = lines.map(line => ({ on: line.startsWith('on'), bBox: line.split(',').map(p => [...p.matchAll(/(-?\d+)/g)].map(e => +e[0])) }));

let isIntersecting = (a, b) => a.map(([min, max], i) => min > b[i][1] || max < b[i][0]).some(a => !a);
let intersect = (a, b) => a.map(([min, max], i) => [Math.max(min, b[i][0]), Math.min(max, b[i][1])])
let volume = (c) => c.reduce((p, c) => (p = p * (c[1] - c[0] + 1), p), 1)

console.log(isIntersecting([[0, 10]], [[11, 12]]));
console.log(isIntersecting([[0, 10]], [[10, 11]]));
console.log(isIntersecting([[0, 10]], [[5, 10]]));

console.log(intersect([[0, 10]], [[11, 12]]));
console.log(intersect([[0, 10]], [[10, 11]]));
console.log(intersect([[0, 10]], [[5, 10]]));
console.log(intersect([[0, 10], [0, 10]], [[5, 10],[5, 10]]));

console.log(volume([[0, 9], [0, 9]]) == 100);
console.log(volume([[0, 9], [0, 9], [0, 9]]) == 1000);


let bBoxes = [];
boundingBoxes.forEach(b => {
    const newBoxes = [];
    if (b.on) newBoxes.push(b);
    for (let bb of bBoxes) {
        if (isIntersecting(b.bBox, bb.bBox)) {
            newBoxes.push({ on: !bb.on, bBox: intersect(b.bBox, bb.bBox) });
        }
    }

    bBoxes = bBoxes.concat(newBoxes);

    console.log(bBoxes.length)
})

let rrrr = bBoxes.reduce((p, b) => p + volume(b.bBox) * (b.on ? 1 : -1), 0)

console.log(rrrr);



