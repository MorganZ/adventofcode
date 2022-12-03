const data = require('fs').readFileSync('./2/input.txt', 'utf8');

var strategy = { "X": "A", "Y": "B", "Z": "C" };
let choicScore = { "A": 1, "B": 2, "C": 3 }
let TableScore = { "AA": 3, "AB": 6, "AC": 0, "BA": 0, "BB": 3, "BC": 6, "CA": 6, "CB": 0, "CC": 3, };

let replaceByStrategy = (key) => key[0] + strategy[key[2]];
let inputs = Object.entries(data.split("\r\n").reduce((p, c) => (p[c] = p[c] ? p[c] + 1 : 1, p), {}))
    .map(c => ({ set: replaceByStrategy(c[0]), count: c[1] }));


var score = inputs.map(c => (choicScore[c.set[1]] + TableScore[c.set]) * c.count).reduce((p, c) => p + c, 0);

console.log(score);