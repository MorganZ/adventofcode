const input = require('fs').readFileSync('./6/input.txt', 'utf-8')
let size = 14, index = 0;
while (new Set(input.slice(index, index + size)).size != size) index++;
console.log(index + size);