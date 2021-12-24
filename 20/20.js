let data = require('fs').readFileSync("./20/input.txt", "utf8").split('\n\n');

let table = data[0].replace(/\n/g, '').split('');
let img = data[1].replace(/\./g, '0').replace(/\#/g, '1').split("\n").map(e => e.split(''));

let b = '0'; //keep track background color
for (let step = 0; step < 50; step++) {
    let imgNext = [...Array(img.length + 4)].map(r => Array(img[0].length + 4).fill(b));
    let i = [...Array(img.length + 4)].map(r => Array(img[0].length + 4).fill(b));
    for (let x = 0; x < img.length; x++)  i[x + 2] = [b, b, ...img[x], b, b];

    for (let r = 1; r < i.length - 1; r++) {
        for (let c = 1; c < i[0].length - 1; c++) {
            let ind = i[r - 1][c - 1] + i[r - 1][c] + i[r - 1][c + 1]
                + i[r][c - 1] + i[r][c] + i[r][c + 1]
                + i[r + 1][c - 1] + i[r + 1][c] + i[r + 1][c + 1];
            imgNext[r][c] = table[parseInt(ind, 2)] == '#' ? '1' : '0';
        }
    }
    b = imgNext[1][1];
    (imgNext.pop(), imgNext.shift())
    for (let r = 0; r < imgNext.length; r++)  (imgNext[r].pop(), imgNext[r].shift());

    img = imgNext;
}

console.log(img.flat(1).filter(e => e == '1').length);

//debug img.map((r, d) => r.join('') + 'x-' + d).forEach(c => console.log(c));

