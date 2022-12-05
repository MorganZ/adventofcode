const [lstack, lmove] = require('fs').readFileSync("./5/input.txt", 'utf8').split('\r\n\r\n').map((c) => c.split('\r\n'));
const stacks = Array.from({length:9},()=> [])
lstack.forEach(c => stacks.forEach((s, i) => c[1 + (i * 4)] != ' ' ? s.unshift(c[1 + (i * 4)]) : null));
const moves = lmove.map(c => c.split(' ').filter((v, i) => (i + 1) % 2 == 0).map((c, i ) =>  parseInt(c) + (i>0?-1:0)))

for (const [count, from, to] of moves) 
    stacks[to].push(...stacks[from].splice(stacks[from].length-count, count));

console.log(stacks.map(c => c.pop()).join(''));