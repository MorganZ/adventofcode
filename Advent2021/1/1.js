let l = require('fs').readFileSync("1.txt", "utf8").split("\n");
let count = 0;
for (let i = 1; i < l.length; i++) {
    count += l[i - 1] - l[i] < 0 ? 1 : 0;
}
console.log(count);