const input = require('fs').readFileSync('./12/input.txt', 'utf-8');
const map = input.replace('S', 'a').replace('E', 'z').split("\n").map(l => l.split('').map(e => +e.charCodeAt(0) - 97))
const start = (pos = input.replaceAll('\n', '').indexOf('S'), { x: pos % map[0].length, y: Math.floor(pos / map[0].length) });
const end = (pos = input.replaceAll('\n', '').indexOf('E'), { x: pos % map[0].length, y: Math.floor(pos / map[0].length) });
let adjs = [[-1, 0], [0, -1], [0, 1], [1, 0]];

const getPossibleNeighbors = (from) => adjs.map(adj => (p = { x: from.x + adj[1], y: from.y + adj[0] }, p.key = p.x + ',' + p.y, p))
    .filter(neighbor => map[neighbor.y] && map[neighbor.y][neighbor.x] >= 0 && map[from.y][from.x] - map[neighbor.y][neighbor.x] >= -1);

let mapDebug = map.map(l => l.map(e => 0));
const visited = new Set([start.key]);
let positions = [start], nextPositions = [], dist = 1;
while (positions.length > 0) {
    for (let current of positions) {
        mapDebug[current.y][current.x] = 1;
        for (let neighbor of getPossibleNeighbors(current)) {
            if (neighbor.x === end.x && neighbor.y === end.y) throw "found it " + dist; // part 1
            if (visited.has(neighbor.key)) continue;
            nextPositions.push(neighbor);
            visited.add(neighbor.key);
        }
    }
    positions = nextPositions, nextPositions = [];
    dist++;
}
