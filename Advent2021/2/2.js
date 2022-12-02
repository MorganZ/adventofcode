let l = require('fs').readFileSync("./2/2.txt", "utf8").split("\n");

let x = 0; let dist = 0;

for (let i = 0; i < l.length; i++) {
    let value = +[...l[i]].reverse()[0];
    switch (l[i][0]) {
        case 'd':
            dist += value;
            break;
        case 'u':
            dist -= value;
            break;
        case 'f':
            x += value;
            break;
    }
}
console.log(x * dist);