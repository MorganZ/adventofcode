let l = require('fs').readFileSync("2.txt", "utf8").split("\n");
let x = 0; let dist = 0; let aim = 0;

for (let i = 0; i < l.length; i++) {
    let value = parseInt([...l[i]].reverse()[0]);
    switch (l[i][0]) {
        case 'd':
            aim += value;
            break;
        case 'u':
            aim -= value;
            break;
        case 'f':
            x += value;
            dist += value * aim;
            break;
    }
}
console.log(x * dist);