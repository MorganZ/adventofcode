function setContains(setA, setB) {
    for (let el of setB) {
        if (!setA.has(el)) {
            return false;
        }
    }
    return true;
}

function setDifference(setA, setB) {
    let difference = new Set(setA);
    for (let elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

let l = require('fs').readFileSync("./8/input.txt", "utf8").split('\n').map(l => l.split(' | ').map(e => e.split(' ')));
let sum = 0;
for (let i = 0; i < l.length; i++) {
    let digits = l[i][0].sort((a, b) => a.length - b.length).map(d => new Set([...d].sort()));

    let one = digits[0];
    let seven = digits[1];
    let four = digits[2];
    let eight = digits[9];
    let fivedigits = [[3, setContains(digits[3], one)], [4, setContains(digits[4], one)], [5, setContains(digits[5], one)]];
    let three = fivedigits.filter(e => e[1]).map(e => digits[e[0]])[0];
    let twoOrFive = fivedigits.filter(e => !e[1]).map(e => e[0]);
    let r = setDifference(four, one);
    let five = digits[twoOrFive.filter(e => setContains(digits[e], r))];
    let two = digits[twoOrFive.filter(e => !setContains(digits[e], r))];
    let sixDigits = [[6, setContains(digits[6], four)], [7, setContains(digits[7], four)], [8, setContains(digits[8], four)]];
    let nine = sixDigits.filter(e => e[1]).map(e => digits[e[0]])[0];
    let zeroOrSix = sixDigits.filter(e => !e[1]).map(e => e[0]);
    let zero = digits[zeroOrSix.filter(e => setContains(digits[e], seven))];
    let six = digits[zeroOrSix.filter(e => !setContains(digits[e], seven))];

    let entries = [zero, one, two, three, four, five, six, seven, eight, nine].map((e, i) => [[...e].join(''), i]);
    let d = Object.fromEntries(entries);

    sum += parseInt(l[i][1].map(e => d[[...e].sort().join('')]).join(''))
}
console.log(sum);
