
const inputs = require('fs').readFileSync("./5/input.txt", 'utf8').split('\r\n\r\n').map((c)=> c.split('\r\n'));

[sstack, smove] = inputs;

const stacks = new Array(9).fill(0).map(c=>[]);

for (let l = 0; l < sstack.length-1; l++) {
    const element = sstack[l];    
    for (let index = 0; index < 9; index++) {
        const blockId = element[1+(index*4)];
        if(blockId != ' '){
            stacks[index].unshift(blockId);
        }
    }
}

const moves = smove.map(c=> c.split(' ').filter((v, i)=> (i+1)%2 == 0).map(c=>parseInt(c)))

for(const [count, from, to] of moves){
    for (let i = 0; i < count; i++) {        
        var blockId =  stacks[from-1].pop()
        stacks[to-1].push(blockId);
    }
}

console.log(stacks.map(c=>c.pop()).join(''));
