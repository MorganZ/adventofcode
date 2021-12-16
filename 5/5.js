let lines = require('fs').readFileSync("./5/5.txt", "utf8").split("\n").map(el => el.replace(" -> ", ",").split(",").map(c => parseInt(c)));

let pointsMap = {};
for (let [x, y, x2, y2] of lines) {
    if (x1 == x2 || y1 == y2) continue;
    const [dx, dy] = [Math.sign(x2 - x), Math.sign(y2 - y)];
    for (; x != x2 + dx || y != y2 + dy; x += dx, y += dy)
        pointsMap[`${x}-${y}`] = (pointsMap[`${x}-${y}`] ?? 0) + 1;
}
console.log(Object.values(pointMap).filter(c => c >= 2).length);

