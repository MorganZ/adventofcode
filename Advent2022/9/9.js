const dirToVector = { U: { x: 0, y: 1 }, D: { x: 0, y: -1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } }
const moves = require('fs').readFileSync('./9/input.txt', 'utf-8').split('\n').map(move => [dirToVector[move[0]], parseInt(move.slice(1))]);

const visited = new Set(['0,0']), rope = new Array(ropeSize=10).fill(0).map(c => ({ x: 0, y: 0 }));
const moveHead = (direction, distance) => {
    for (let i = 0; i < distance; i++) {
        rope[0].x += direction.x, rope[0].y += direction.y;
        for (let index = 1; index < rope.length; index++) {
            const head = rope[index - 1], tail = rope[index];
            let x = head.x - tail.x, y = head.y - tail.y;
            if (Math.abs(x) > 1 || Math.abs(y) > 1) {
                tail.x += Math.sign(x), tail.y += Math.sign(y);
                if (index === rope.length - 1) visited.add(`${tail.x},${tail.y}`);
            }
            else break;
        }
    }
}
moves.forEach(move => moveHead(move[0], move[1]));
console.log(visited.size);
