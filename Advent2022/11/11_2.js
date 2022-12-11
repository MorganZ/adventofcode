
const input = require('fs').readFileSync('./11/input.txt', 'utf-8');

const monkeys = input.split("\n\n").map(c => c.split("\n")).map(lines =>
({
    id: parseInt(lines[0].match(/Monkey (\d+)/)[1]),
    items: lines[1].match(/\d+/g).map(Number),
    operation: ((op)=> (old)=> eval(op.replace(/old/g, old)))(lines[2].match(/Operation: new = (.*)/)[1]),
    test: parseInt(lines[3].match(/Test: divisible by (\d+)/)[1]),
    "1": parseInt(lines[4].match(/If true: throw to monkey (\d+)/)[1]),
    "0": parseInt(lines[5].match(/If false: throw to monkey (\d+)/)[1]),
    inspected: 0,
}));

function simulateMonkeys(monkeys) {
    let divisor = monkeys.reduce((acc, monkey) => acc * monkey.test, 1);
    for (let round = 0; round < 10000; round++) {
        for (const monkey of monkeys) {
            for (let worryLevel of monkey.items) {
                worryLevel = monkey.operation(worryLevel) % divisor;
                let divisible = worryLevel % monkey.test === 0;
                monkeys[monkey[+divisible]].items.push(worryLevel);
            }
            monkey.inspected += monkey.items.length;
            monkey.items = [];
        }
    }
}

simulateMonkeys(monkeys);
const result = Object.values(monkeys).sort((a, b) => b.inspected - a.inspected).slice(0, 2).reduce((p, c) => p * c.inspected, 1);
console.log(result);
