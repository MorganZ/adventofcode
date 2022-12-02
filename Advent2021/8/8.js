let lines = require('fs').readFileSync("./8/input.txt", "utf8").split('\n').map(l => l.split('|')[1].split(' '));
let sizes = [2, 3, 4, 7], count = 0;
for (let l of lines) 
    for (let number of l)
        if (sizes.includes(number.length)) count++;
console.log(count);