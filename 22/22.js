let lines = require('fs').readFileSync('./22/input.txt', 'utf-8').split('\n');
let boundingBoxes = lines.map(line => ({ on: line.startsWith('on'), bBox: line.split(',').map(p => [...p.matchAll(/(-?\d+)/g)].map(e => +e[0])) }));

let m = new Map();
boundingBoxes.forEach((e) => {
    let [[x0, x1], [y0, y1], [z0, z1]] = e.bBox;
    for (let x = x0; x <= x1 && -51 < x && x < 51; x++)
        for (let y = y0; y <= y1 && -51 < y && y < 51; y++)
            for (let z = z0; z <= z1 && -51 < z && z < 51; z++)
                m.set(x + "," + y + "," + z, +e.on);

})
console.log([...m.values()].filter(a => a).length);