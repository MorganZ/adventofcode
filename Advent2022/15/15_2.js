//Sensor at x=2, y=18: closest beacon is at x=-2, y=15
//parse this line to get the coordinates of the sensor and beacons

const sensorData = require('fs').readFileSync('./15/input.txt', 'utf-8').split('\n')
    .map(line => {
        const regex = /x=(-?\d+), y=(-?\d+)/g;
        const xyCoordinates = line.match(regex).map(coordinate => coordinate.split(","));
        const xyCoordinatesInt = xyCoordinates.map(coordinate => coordinate.map(c => parseInt(c.split("=")[1])));
        return xyCoordinatesInt;
    })



for (let line = 0; line < 4000000; line++) {
    const possiblePoints = [];
    sensorData.forEach(([sPos, bPos]) => {
        const distance = Math.abs(sPos[0] - bPos[0]) + Math.abs(sPos[1] - bPos[1]);
        const distanceToLine = Math.abs(sPos[1] - line);

        let left = distance - distanceToLine
        if( 0< left) {
            possiblePoints.push([sPos[0]-left, sPos[0]+left]);
        }
    });

    var range = possiblePoints.sort((a, b) => a[0] - b[0]);
    range.reduce((p, c) => {
        if (p[1] >= c[0]) {
            if(p[1] < c[1]) return c;
            else return p;
        }
        else {
            var [x, y ] = [p[1]  + 1, line]
            console.log(x,y);
            console.log(x*4000000+y);
            throw new Error("Not possible");
        }
    });
}


possibleBeacons.forEach(beacon => {
    possiblePoints.delete(beacon);
});

console.log(possiblePoints.size);