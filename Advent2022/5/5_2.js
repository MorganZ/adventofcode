const [sstack, smove] = require('fs').readFileSync("./5/input.txt", 'utf8').split('\r\n\r\n').map((c) => c.split('\r\n'));
const stacks = new Array(9).fill(0).map(c => []);
sstack.forEach(c => stacks.forEach((s, i) => c[1 + (i * 4)] != ' ' ? s.unshift(c[1 + (i * 4)]) : null));
const moves = smove.map(c => c.split(' ').filter((v, i) => (i + 1) % 2 == 0).map(c => parseInt(c)))

const tempStack = [];
for (const [count, from, to] of moves) {
    for (let i = 0; i < count; i++) tempStack.push(stacks[from - 1].pop());
    for (let i = 0; i < count; i++) stacks[to - 1].push(tempStack.pop());
}

console.log(stacks.map(c => c.pop()).join(''));
