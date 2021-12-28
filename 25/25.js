let data = require('fs').readFileSync('./25/input.txt', 'utf-8').split('\n').map(l => [...l]);

console.log(data);

let c = 0

for (let step = 1; true; step++) {
    let change = false;
    let swaps = [];
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            if (data[y][x] == '>' && data[y][(x + 1) % data[0].length] == '.') {
                swaps.push([y, x]);
            }
        }
    }
    for (let [y, x] of swaps) {
        [data[y][x], data[y][(x + 1) % data[0].length]] = [data[y][(x + 1) % data[0].length], data[y][x]];
    }
    change = swaps.length > 0;
    swaps = [];
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            if (data[y][x] == 'v' && data[(y + 1) % data.length][x] == '.') {
                swaps.push([y, x]);
            }
        }
    }
    for (let [y, x] of swaps) {
        [data[y][x], data[(y + 1) % data.length][x]] = [data[(y + 1) % data.length][x], data[y][x]];
    }
    change = change || swaps.length > 0;
    if (!change) { 
        console.log(step);
        break;}
}

console.log('test');