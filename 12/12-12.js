const fs = require('fs');
const input = fs.readFileSync("./12/input.txt", "utf8");

let graph = input.split("\n").map(e => e.split('-')).reduce((g, [from, to]) => {
    g[from] ? (g[from].push(to)) : (g[from] = [to]);
    g[to] ? (g[to].push(from)) : (g[to] = [from]);
    return g; 
}, {});

let paths = 0;

(function findPaths(from, visited,revisited) {
    const isVisited = visited.includes(from);
    if(isVisited && revisited) return;
    if(from === from.toLocaleLowerCase()) visited.push(from);
    if(isVisited) revisited = true;

    graph[from].filter(to=> to !== 'start' ).forEach((to) => {
        if (to === 'end') paths += 1;
        else findPaths(to, [...visited], revisited);
    });
})('start', [] , false)

console.log(paths);