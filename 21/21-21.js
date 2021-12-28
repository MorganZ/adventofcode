//Not working solution for now 
//157253621231420

let pid = 1;
let start = [new Map([['1,0', 1]]), new Map([['6,0', 1]])];
//let possibleRolls = Object.entries({ 3: 1n, 4: 3n, 5: 6n, 6: 7n, 7: 6n, 8: 3n, 9: 1n })
//let possibleRolls = [["3",1n],["4",3n],["5",6n],["6",7n],["7",6n],["8",3n],["9",1n]]
let possibleRolls = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]]
let pc = [0, 0];
let total_prec = 0;
while (start[0].size > 0 && start[1].size > 0) {
    pid ^= 1;
    let total_universe = 0;
    let temp_score = start[pid].entries();
    let newScores = new Map();
    for (let [key, uCount] of temp_score) {
        for (let [d, duCount] of possibleRolls) {
            let [pos, score] = key.split(',').map(c => +c);
            pos = (pos + d - 1) % 10 + 1;
            score += pos;
            let newUCount = uCount * duCount;
            if (score < 21) {
                let key = `${pos},${score}`;
                total_universe += newUCount;
                newScores.set(key, (newScores.get(key) ?? 0) + newUCount);
            }
            else {
                pc[pid] += newUCount * total_prec
            }
        }
    }
    total_prec = total_universe
    start[pid] = newScores;
}
console.log(pc);
