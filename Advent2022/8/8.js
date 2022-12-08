const grid = require('fs').readFileSync('./8/input.txt', 'utf-8').split("\r\n").map(row => row.split("").map(Number));

const isTreeVisible = (grid, x, y) => {
    const height = grid[y][x];
    const left = (grid[y].slice(0, x)??[-1]).some(h => h >= height);
    const right = (grid[y].slice(x + 1)??[-1]).some(h => h >= height);
    const top = (grid.slice(0, y)??[-1]).some(row => row[x] >= height);
    const bottom = (grid.slice(y + 1)??[-1]).some(row => row[x] >= height);
    return !(left && right && top && bottom);
}
const countVisibleTrees = grid => grid.reduce((p, row, y) => p + row.reduce((p, _, x) => p + (isTreeVisible(grid, x, y) ? 1 : 0), 0), 0);

console.log(countVisibleTrees(grid));
