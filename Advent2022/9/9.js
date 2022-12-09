const dirToVector = { U: { x: 0, y: 1 }, D: { x: 0, y: -1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } }
const moves = require('fs').readFileSync('./9/input.txt', 'utf-8').split('\n').map(move => [dirToVector[move[0]], parseInt(move.slice(1))]);

[2, 10].map(ropeSize => {
    const rope = new Array(ropeSize).fill(0).map(c => ({ x: 0, y: 0 }));
    const visited = new Set(['0,0'])
    const moveHead = (direction, distance) => {
        for (let i = 0; i < distance; i++) {
            let head = rope[0];
            head.x += direction.x, head.y += direction.y;
            for (let index = 1; index < rope.length; index++) {
                const head = rope[index - 1], tail = rope[index];
                if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
                    tail.x += Math.sign(head.x - tail.x), tail.y += Math.sign(head.y - tail.y);
                    if (index === rope.length - 1) visited.add(`${tail.x},${tail.y}`);
                }
                else break;
            }
        }
    }
    moves.forEach(move => moveHead(move[0], move[1]));
    console.log(visited.size);
});