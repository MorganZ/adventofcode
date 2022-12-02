let r = /x=(-?\d+)\.\.(-?\d+)\,y=(-?\d+)\.\.(-?\d+)\,z=(-?\d+)\.\.(-?\d+)/g;
let data = require('fs').readFileSync('./22/input.txt', 'utf-8').split('\n');

let m = new Set();

//let clam = (a) => a < -50 ? -51 : a > 50 ? 51 : a;

let rr = data.forEach(d => {
    let on = d.startsWith('on');
    let [x0, x1, y0, y1, z0, z1] = [...d.matchAll(r)][0].slice(1).map(e => +e);

    console.log([x0, x1, y0, y1, z0, z1]);

    for (let x = x0; x <= x1 ; x++) {
        for (let y = y0; y <= y1 ; y++) {
            for (let z = z0; z <= z1 ; z++) {
                on ? m.add(x + "," + y + "," + z) : m.delete(x + "," + y + "," + z);
            }
        }
    }
})
console.log([...m.values()].filter(a => a).length);

