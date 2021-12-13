const fs = require('fs');

const input = fs.readFileSync("./12/input.txt", "utf8");

let graph = input.split("\n").map(e => e.split('-')).reduce((g, [from, to]) => {
    g[from] ? (g[from].push(to)) : (g[from] = [to]);
    g[to] ? (g[to].push(from)) : (g[to] = [from]);
    return g; 
}, {});

let paths = 0;

(function findPaths(cave, visited) {
    if (cave === cave.toLowerCase()) visited.push(cave);
    graph[cave].filter(c => !visited.includes(c)).forEach((c) => {
        if (c === 'end') paths += 1;
        else findPaths(c, [...visited]);
    });
})('start', [])

console.log(paths);