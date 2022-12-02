//Not working solution for now 

let pid = 1;
let start = [new Map([['1,0', 0]]), new Map([['6,0', 0]])];
let diceValues = [1, 2, 3];
let possibleRolls = Object.entries(diceValues.flatMap(d1 => diceValues.flatMap(d2 => diceValues.flatMap(d3 => d1 + d2 + d3))).reduce((p, c) => (p[c] ? p[c]++ : p[c] = 1, p), {}));
let pc = [0, 0];
while (start[0].size > 0 || start[1].size > 0) {
    console.log(start);
    pid ^= 1;
    let newScores = new Map();
    for (let [key, count] of start[pid].entries()) {
        for (let [d, c] of possibleRolls) {
            let [p, ps] = key.split(',').map(c => +c);
            p = (p + d - 1) % 10 + 1;
            ps += p;
            newScores.set(p + "," + ps, (newScores.get(p + "," + ps) ?? 1) + c * count);
            if (ps >= 21) {
                pc[pid] = pc[pid] + newScores.get(p + "," + ps);
                newScores.delete(p + "," + ps);
            }
        }
    }
    start[pid] = newScores;
}
console.log(pc);