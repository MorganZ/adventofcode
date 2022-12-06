const input = require('fs').readFileSync('./6/input.txt', 'utf-8')
let size = 14, index = size;
while (new Set(input.slice(index-size, index)).size != size) index++;
console.log(index);