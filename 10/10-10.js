const lines = require('fs').readFileSync("./10/input.txt", "utf8").split("\n").map((e) => e.split(''));
let points = { "(": 1, "[": 2, "{": 3, "<": 4 };
let list = [];
for(let line of lines){
    let stack = []
    let pass = false;
    for (let c = 0; c < line.length; c++) {
        const current = line[c];
        if (')]}>'.includes(current)) {
            if (!"()[]{}<>".includes(stack.pop() + current)) {
                pass = true;
                break;
            }
        }
        else stack.push(current);
    }
    if (pass) continue;
    stack.reverse();
    let sum = stack.reduce((p, c) => p * 5 + points[c], 0);
    list.push(sum);
}
console.log(list.sort((a, b) => b - a)[Math.ceil(list.length / 2) - 1])