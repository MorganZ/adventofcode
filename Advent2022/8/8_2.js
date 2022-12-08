const grid = require('fs').readFileSync('./8/input.txt', 'utf-8').split("\r\n").map(row => row.split("").map(Number));

const getScenicScore = (grid, x, y) => {
    const getDistance = (dx, dy) => {
        let distance = 0;
        for (let X = x, Y = y; grid[Y + dy] && grid[Y + dy][X + dx] > -1; Y += dy, X += dx) {
            distance++;
            if (grid[y][x] <= grid[Y + dy][X + dx]) break;
        }
        return distance === 0 ? 1 : distance;
    }
    return getDistance(0, -1) * getDistance(-1, 0) * getDistance(0, 1) * getDistance(1, 0);
}
const getMaxScenicScore = grid => grid.reduce((p, row, y) => Math.max(p, ...row.map((_, x) => getScenicScore(grid, x, y))), 0);

console.log(getMaxScenicScore(grid));
