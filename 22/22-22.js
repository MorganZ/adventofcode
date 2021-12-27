let data = require('fs').readFileSync('./22/input.txt', 'utf-8').split('\n');
let isIntersecting = (a, b) => a.map(([min, max], i) => min > b[i][1] || max < b[i][0]).some(a => !a);
let intersect = (a, b) => a.map(([min, max], i) => [Math.max(min, b[i][0]), Math.min(max, b[i][1])])

let boxes = data.map(d => {
    let on = d.startsWith('on');
    let bBox = d.split(',').map(l => [...l.matchAll(/(-?\d+)/g)].map(e => +e[0]));
    return { on, bBox }
});


let newBoxes = [];

boxes.forEach(b => {
    let _boxes = [];
    if (b.on) _boxes.push(b);
    for (let bb of newBoxes) {
        if (isIntersecting(b.bBox, bb.bBox))
            _boxes.push({ on: !bb.on, bBox: intersect(b.bBox, bb.bBox) });
    }

    newBoxes = newBoxes.concat(_boxes);
    console.log(newBoxes.length)
})

console.log(newBoxes);
