
const inputs = require('fs').readFileSync("./4/input.txt", 'utf8').split('\r\n').map(c=>c.split(',').map(c=>c.split("-").map(c=>parseInt(c))));

let result = inputs.map(c=> (c[0][1] < c[1][0] || c[1][1] < c[0][0] )? 0: 1).reduce((p,c) => p+c , 0);

console.log(result);

