const input = require('fs').readFileSync('./9/input.txt', 'utf-8')

const moves = input.split('\n').map(move => move.split(' ').map((val, i) => i === 0 ? val : parseInt(val)));

const head = { x: 0, y: 0 };
const tails = new Array(10).fill(0).map(c=> ({ x: 0, y: 0 }));

const visited = new Set();
visited.add(`0,0`);

const moveHead = (direction, distance) => {
    for (let i = 0; i < distance; i++) {
        switch (direction) {
            case 'U':
                head.y++;
                break;
            case 'D':
                head.y--;
                break;
            case 'L':
                head.x--;
                break;
            case 'R':
                head.x++;
                break;
        }
        currentHead = head;
        for (let index = 1; index < tails.length; index++) {
            const currentTail = tails[index];
            if (Math.abs(currentHead.x - currentTail.x) > 1 || Math.abs(currentHead.y - currentTail.y) > 1) {
                moveTail(currentHead, currentTail);
                if(index === tails.length - 1)
                    visited.add(`${currentTail.x},${currentTail.y}`);
            }
            currentHead = currentTail;
        }
    }
}

const moveTail = (head, tail) => {
    if (head.x === tail.x) {
        if (head.y > tail.y) {
            tail.y++;
        } else {
            tail.y--;
        }
    } else if (head.y === tail.y) {
        if (head.x > tail.x) {
            tail.x++;
        } else {
            tail.x--;
        }
    } else {
        if (head.x > tail.x) {
            tail.x++;
        } else {
            tail.x--;
        }
        if (head.y > tail.y) {
            tail.y++;
        } else {
            tail.y--;       
        }
    }
}

moves.forEach(move => moveHead(move[0], move[1]));

//visualize the grid

const grid = new Array(25).fill(0).map(c => new Array(25).fill(0));
visited.forEach(pos => {
    const [x, y] = pos.split(',').map(Number);
    grid[x+12][y+12] = 1;
});

console.log(grid)