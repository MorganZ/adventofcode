const input = require('fs').readFileSync('./12/input.txt', 'utf-8');
const map = input.replace('S', 'a').replace('E', 'z').split("\n").map(l => l.split('').map(e => +e.charCodeAt(0) - 97))
const end = (pos = input.replaceAll('\n', '').indexOf('E'), { x: pos % map[0].length, y: Math.floor(pos / map[0].length) });
let adjs = [[-1, 0], [0, -1], [0, 1], [1, 0]];
const getPossibleNeighbors = (from) => adjs.map(adj => (p = { x: from.x + adj[1], y: from.y + adj[0] }, p.key = p.x + ',' + p.y, p))
    .filter(neighbor => map[neighbor.y] && map[neighbor.y][neighbor.x] >= 0 && map[neighbor.y][neighbor.x] - map[from.y][from.x] >= -1);

const visited = new Set();
let locations = [end], nextLocations = [], dist = 1;
while (locations) {
    for (let location of locations)
        for (let neighbor of getPossibleNeighbors(location)) {
            if (map[neighbor.y][neighbor.x] === 0) throw "found it " + dist; 
            if (visited.has(neighbor.key)) continue;
            nextLocations.push(neighbor);
            visited.add(neighbor.key);
        }
    locations = nextLocations, nextLocations = [];
    dist++;
}
