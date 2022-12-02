const fs = require('fs');
const { format } = require('path');

const data = fs.readFileSync('./2/input.txt', 'utf8');

let o = data.split("\r\n").reduce((p, c) => (p[c] = p[c] ? p[c] + 1 : 1, p), {});
let result = Object.entries(o);

let choicScore = { "A": 1, "B": 2, "C": 3 }

let TableScore = {
    "A A": 3,
    "A B": 6,
    "A C": 0,
    "B A": 0,
    "B B": 3,
    "B C": 6,
    "C A": 6,
    "C B": 0,
    "C C": 3,
};

var strategy = [["A", "X"], ["B", "Y"], ["C", "Z"]];

let replaceByStrategy = function (key) {
    for (let el of strategy) {
        key = key.replace(el[1], el[0]);
    }
    return key;
}

var rr = Object.entries(result).map(c => [replaceByStrategy(c[1][0]), c[1][1]]).map(c => (choicScore[c[0][2]] + TableScore[c[0]] )* c[1]  )
        .reduce((p,c )=> p+c , 0);

let p = result

console.log(result);