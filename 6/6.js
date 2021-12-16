let fs = require('fs').readFileSync("./6/6.txt", "utf8").split(",").map(e => +e);

for (let day = 0; day < 80; day++) {
    let nbFish = fs.length;
    for (let f = 0; f < nbFish; f++) {
        const age = fs[f]--;
        if (age == 0) {
            fs.push(8);
            fs[f] = 6;
        }
    }
}
console.log(fs.length);