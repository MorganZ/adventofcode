const input = require('fs').readFileSync('./12/input.txt', 'utf-8');

const map = input.replace('S', 'a').replace('E', 'z').split("\n").map(l => l.split('').map(e => +e.charCodeAt(0) - 97))
const start = (pos = input.replaceAll('\n', '').indexOf('S'), { x: pos % map[0].length, y: Math.floor(pos / map[0].length) });
const end = (pos = input.replaceAll('\n', '').indexOf('E'), { x: pos % map[0].length, y: Math.floor(pos / map[0].length) });

let adjs = [[-1, 0], [0, -1], [0, 1], [1, 0]];

const getNeighbors = (from) => adjs.map(adj => ({ x: from.x + adj[0], y: from.y + adj[1] }))
    .filter(neighbor => map[neighbor.y] && map[neighbor.y][neighbor.x] >= 0 
        && map[neighbor.y][neighbor.x] - map[from.y][from.x] >= -1);

let mapDebug = map.map(l => l.map(e => 0));
const visited = new Set();
let  positions = [end], nextPositions = [] , dist = 1;
while (positions) {
    for (let current of positions) {
        mapDebug[current.y][current.x] = 1;
        let neighbors = getNeighbors(current);
        for (let neighbor of neighbors) {
            //if (neighbor.x === start.x && neighbor.y === start.y) throw "found it " + dist; // part 1
            if (map[neighbor.y][neighbor.x] === 0) throw "found it " + dist; // part 2
            if (!visited.has(neighbor.x + ',' + neighbor.y)) {
                nextPositions.push(neighbor);
                visited.add(neighbor.x + ',' + neighbor.y);
            }
        }
    }
    positions = nextPositions, nextPositions = [];
    dist++;
}
