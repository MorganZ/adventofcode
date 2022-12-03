
const inputs = require('fs').readFileSync('./3/input.txt', 'utf8').split('\r\n').map(c => c.split(''));
const inputsBy3 = [];
inputs.reduce((p, c) => (p.push(c), p.length == 3 ? (inputsBy3.push(p), p = []) : null, p), []);

const findDuplicate = (arr) => {
    const letterByOcc = arr.map((c) =>[...new Set(c)]).flat().reduce((p, c) => (p[c] = p[c] ? p[c] + 1 : 1, p), {});
    const element = Object.entries(letterByOcc).find((a) => a[1] == 3)[0][0];
    const code = element.charCodeAt(0)
    return [element, code > 95 ? code - 96 : code - 38];    
}

let score = inputsBy3.map(findDuplicate).reduce((p,c) => p+c[1] , 0);

console.log(score);


