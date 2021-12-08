var fs = require('fs')

var baseMap = new Map(Array(9).fill(0).map((_,index) => [index, 0]))
function initEmptyMap() {
    return new Map(baseMap.entries());
}

fs.readFile("./6/6.txt", "utf8", function (err, data) {
    let input = data.split(",").map(e => parseInt(e));

    var ps = initEmptyMap();

    for (let index = 0; index < input.length; index++) {
        let age = input[index];
        ps.set(age, ps.get(age) + 1)
    }

    const nbDays = 256;
    let day = 0;
    do {
        const fs = initEmptyMap();
        let newFish = ps.get(0);
        for (let age = 8; age >= 1; age--) {
            fs.set(age - 1, ps.get(age));
        }
        fs.set(6, fs.get(6) + newFish);
        fs.set(8, newFish);
        day+=1;
        ps = fs;
    } while (day < nbDays)
    console.log([...ps.values()].reduce((p, c) => p + c, 0));
});
