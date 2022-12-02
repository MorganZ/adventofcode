let r = /x=(-?\d+)\.\.(-?\d+)\,y=(-?\d+)\.\.(-?\d+)\,z=(-?\d+)\.\.(-?\d+)/g;
let data = require('fs').readFileSync('./22/input.txt', 'utf-8').split('\n');

let m = new Map();

let clam = (a) => a < -50 ? -51 : a > 50 ? 51 : a;

let rr = data.forEach(d => {
    let on = d.startsWith('on');
    let [x0, x1, y0, y1, z0, z1] = [...d.matchAll(r)][0].slice(1).map(e => clam(+e));

    console.log([x0, x1, y0, y1, z0, z1]);

    for (let x = x0; x <= x1 && -51 < x && x < 51; x++) {
        for (let y = y0; y <= y1 && -51 < y && y < 51; y++) {
            for (let z = z0; z <= z1 && -51 < z && z < 51; z++) {
                m.set(x + "," + y + "," + z, +on);
            }
        }
    }
})
console.log([...m.values()].filter(a => a).length);

