var input = require('fs').readFileSync("./6/6.txt", "utf8").split(",").map(e => parseInt(e));
let baseMap = new Map(Array(9).fill(0).map((_, index) => [index, 0]))
var fishes = new Map(baseMap.entries());

for (let age of input){
    fishes.set(age, fishes.get(age) + 1)
}

for (let day = 0; day < 256; day++) {
    const tfs = new Map(baseMap.entries());
    let newFish = fishes.get(0);
    for (let age = 8; age >= 1; age--) {
        tfs.set(age - 1, fishes.get(age));
    }
    tfs.set(6, tfs.get(6) + newFish);
    tfs.set(8, newFish);
    fishes = tfs;
} 
console.log([...fishes.values()].reduce((p, c) => p + c, 0));