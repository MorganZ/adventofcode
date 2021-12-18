var input = require('fs').readFileSync("./6/6.txt", "utf8").split(",").map(e => parseInt(e));
var fishes = input.reduce((p, c) => (p[c] += 1, p), Array(9).fill(0));

for (let day = 0; day < 256; day++) {
    fishes.push(fishes.shift());
    fishes[6] += fishes[8];
}
console.log([...Object.values(fishes)].reduce((p, c) => p + c, 0));
