
const inputs = require('fs').readFileSync('./3/input.txt', 'utf8').split('\r\n').map(c => c.split('')
        .map((c)=> ( code = c.charCodeAt(0),1<<(code > 95 ? code - 96 : code - 38 ))).reduce((p,c)=>p|c, 0));
const inputsBy3 = [];
inputs.reduce((p, c) => (p.push(c), p.length == 3 ? (inputsBy3.push(p), p = []) : null, p), []);

let score = inputsBy3.map(c=>c.reduce((p, c) => p&c))

console.log(score);


