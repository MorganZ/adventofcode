
const data = require('fs').readFileSync('./2/input.txt', 'utf8');

let inputs = Object.entries(data.split("\r\n").reduce((p, c) => (p[c] = p[c] ? p[c] + 1 : 1, p), {}));

let choiceScore = { "A": 1, "B": 2, "C": 3 }
let wintScore = { "X": 0, "Y": 3, "Z": 6 }
let TableScore = {
    "A Y": "A",
    "A Z": "B",
    "A X": "C",
    "B X": "A",
    "B Y": "B",
    "B Z": "C",
    "C Z": "A",
    "C X": "B",
    "C Y": "C",
};

var score = Object.entries(inputs).map(c => c[1]).map(c => (wintScore[c[0][2]] + choiceScore[TableScore[c[0]]]) * c[1]).reduce((p, c) => p + c, 0);

console.log(score);