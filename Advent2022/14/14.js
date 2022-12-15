const rockWalls = [], theMap = {};
require('fs').readFileSync('./14/input.txt', 'utf-8').split('\n').map(line => line.split("->").map(e => e.split(',').map(Number)).reduce((s, e) => (rockWalls.push([s, e]), e)));
xmax = Math.max(...rockWalls.flat(1).map(([x, y]) => y)) + 2;
rockWalls.forEach(([[sx, sy], [ex, ey]]) => {
    [dx, dy] = [Math.sign(ex - sx), Math.sign(ey - sy)];
    while (true) {
        theMap[`${sx},${sy}`] = '#';
        if (sx === ex && sy === ey) break;
        sx += dx, sy += dy;
    }
});

for (step = 0; [y, x] = [500, 0]; step++) {
    if (theMap[`${y},${x}`]) break;
    while (true) {
        if (x + 1 == xmax) { theMap[`${y},${x}`] = 'O'; break; }
        if (!theMap[`${y},${x + 1}`]) [y, x] = [y, x + 1]
        else if (!theMap[`${y - 1},${x + 1}`]) [y, x] = [y - 1, x + 1]
        else if (!theMap[`${y + 1},${x + 1}`]) [y, x] = [y + 1, x + 1]
        else { theMap[`${y},${x}`] = 'O'; break; }
    }
}
console.log(step);