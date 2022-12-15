const sensorData = require('fs').readFileSync('./15/input.txt', 'utf-8').split('\n')
    .map(line => {
        const xyMatches = line.match(/x=(-?\d+), y=(-?\d+)/g).map(coordinate => coordinate.split(","));
        const coordinates = xyMatches.map(coordinate => coordinate.map(c => parseInt(c.split("=")[1])));
        return coordinates;
    }).sort((a, b) => a[0][1] - b[0][1]);

let ymin = sensorData[0][0][1];
let ymax = sensorData[sensorData.length - 1][0][1];

for (let y = ymin; y < ymax; y++) {
    const possiblePoints = [];
    sensorData.forEach(([sPos, bPos]) => {
        const distance = Math.abs(sPos[0] - bPos[0]) + Math.abs(sPos[1] - bPos[1]);
        const distanceToLine = Math.abs(sPos[1] - y);
        let left = distance - distanceToLine;
        if (0 < left) possiblePoints.push([sPos[0] - left, sPos[0] + left]);
    });
    possiblePoints.sort((a, b) => a[0] - b[0]).reduce((p, c) => {
        if (p[1] >= c[0]) return p[1] < c[1] ?  c : p;
        else throw new Error(p[1] * 4000000 + y);
    });
}