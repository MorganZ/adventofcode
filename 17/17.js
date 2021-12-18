let data = require('fs').readFileSync("./17/input.txt", "utf8");
[_, ylimit] = data.slice(13, data.length).split(', ').map(c => c.split("=")[1].split('..').map(c => +c));

let lastStepYVelocity = Math.abs(ylimit[0]); 
let ymax = lastStepYVelocity*(lastStepYVelocity-1)/2;
console.log(ymax);
