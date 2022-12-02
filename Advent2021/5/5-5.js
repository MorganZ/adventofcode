const lines = require('fs').readFileSync("./5/5.txt", "utf8").split("\n").map(el => el.replace(" -> ", ",").split(",").map(c => +c));
let pointsMap = {};
for (let [x, y, x2, y2] of lines) {
    const [dx, dy] = [Math.sign(x2 - x), Math.sign(y2 - y)];
    for (; x != x2 + dx || y != y2 + dy; x += dx, y += dy)
        pointsMap[`${x}-${y}`] = (pointsMap[`${x}-${y}`] ?? 0) + 1;
}
console.log(Object.values(pointsMap).filter((c) => c > 1).length);