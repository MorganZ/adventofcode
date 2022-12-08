
const inputs = require('fs').readFileSync('./3/input.txt', 'utf8').split('\r\n')
    .map(c => [c.slice(0, c.length / 2).split('').sort(), c.slice(c.length / 2, c.length).split('').sort()]);

const findDuplicate = (arr) => {
    for (let index = 0; index < arr[0].length; index++) {
        const element = arr[0][index];
        if (arr[1].includes(element)){
            const code = element.charCodeAt(0);
            return [element, code > 95 ? code - 96 : code - 38];
        }          
    }
}

let score = inputs.map(findDuplicate).reduce((p,c) => p+c[1] , 0);

console.log(score);


