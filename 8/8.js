let l = require('fs').readFileSync("./8/input.txt", "utf8").split('\r\n').map(l => l.split('|')[1].split(' '));
let sizes = [2, 3, 4, 7];
let count = 0;
for (let i = 0; i < l.length; i++) {
    for (let a = 0; a < l[i].length; a++) {
        const size = l[i][a].length;
        if (sizes.includes(size)) {
            count++;
        }
    }
}
console.log(count);