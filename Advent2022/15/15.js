//Sensor at x=2, y=18: closest beacon is at x=-2, y=15
//parse this line to get the coordinates of the sensor and beacons

const sensorData = require('fs').readFileSync('./15/input.txt', 'utf-8').split('\n')
    .map(line => {
        const regex = /x=(-?\d+), y=(-?\d+)/g;
        const xyCoordinates = line.match(regex).map(coordinate => coordinate.split(","));
        const xyCoordinatesInt = xyCoordinates.map(coordinate => coordinate.map(c => parseInt(c.split("=")[1])));
        return xyCoordinatesInt;
    })


const line = 10;
const possiblePoints = new Set();
const possibleBeacons = new Set();
sensorData.forEach(([sPos, bPos]) => {
    const distance = Math.abs(sPos[0] - bPos[0]) + Math.abs(sPos[1] - bPos[1]);
    const distanceToLine = Math.abs(sPos[1] - line);
    if (distanceToLine <= distance && bPos[1] == line) {
        possibleBeacons.add(`${bPos[0]}`);
    }

    for (let i = 0; i <= distance - distanceToLine; i++) {
        possiblePoints.add(`${sPos[0]-i}`);
        possiblePoints.add(`${sPos[0]+i}`);
    }
});


possibleBeacons.forEach(beacon => {
    possiblePoints.delete(beacon);
});

console.log(possiblePoints.size);