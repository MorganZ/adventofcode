// shadow578 - solution based on https://github.com/shadow578/AdventOfCode2021/blob/main/18_2/main.js
let data = require('fs').readFileSync("./18/input.txt", "utf8").split('\n').map(n => JSON.parse(n));

const magnetude = (ar) => ar > -1 ? ar : 3 * magnetude(ar[0]) + 2 * magnetude(ar[1]);

const flat = (value, depth = 0) =>
    value > -1 ? [{ value, depth }] : value.flatMap(x => flat(x, depth + 1));

const fold = (sn, pos = [0], depth = 0) =>
    sn[pos[0]].depth > depth ? [fold(sn, pos, depth + 1), fold(sn, pos, depth + 1)] : sn[pos[0]++].value;

const explode = (sn) => {
    let i = sn.findIndex(v => v.depth > 4);
    if (i < 0) return false;
    if (i > 0) sn[i - 1].value += sn[i].value;
    if (i < (sn.length - 2)) sn[i + 2].value += sn[i + 1].value;
    sn.splice(i, 2, { value: 0, depth: --sn[i].depth });
    return true;
};

const split = (sn) => {
    let i = sn.findIndex(v => v.value >= 10);
    if (i < 0) return false;
    let v = sn[i];
    sn.splice(i, 1, { value: Math.floor(v.value / 2), depth: v.depth + 1 }, { value: Math.ceil(v.value / 2), depth: v.depth + 1 });
    return true;
};

let result = data.reduce((p, c) => {
    let snFlatten = flat([p, c]);
    while (explode(snFlatten) || split(snFlatten));
    return fold(snFlatten);
})

let m = magnetude(result);
console.log(m);