
const input = require('fs').readFileSync('./11/input.txt', 'utf-8');

const monkeys = input.split("\n\n").map(c => c.split("\n")).map(lines =>
({
    items: lines[1].match(/\d+/g).map(Number),
    op: ((op) => (old) => eval(op.replace(/old/g, old)))(lines[2].match(/= (.*)/)[1]),
    test: +lines[3].match(/(\d+)/)[1],
    "1": +lines[4].match(/(\d+)/)[1],
    "0": +lines[5].match(/(\d+)/)[1],
    inspected: 0,
}));

[[1, 20], [2, 10000]].forEach(rounds => {
    let divisor = monkeys.reduce((acc, monkey) => acc * monkey.test, 1);
    for (let round = 0; round < rounds[1]; round++)
        for (const monkey of monkeys) {
            for (let worryLevel of monkey.items) {
                worryLevel = rounds[0] == 1 ? Math.floor(monkey.op(worryLevel) / 3) : monkey.op(worryLevel) % divisor;
                let divisible = worryLevel % monkey.test === 0;
                monkeys[monkey[+divisible]].items.push(worryLevel);
            }
            monkey.inspected += monkey.items.length;
            monkey.items = [];
        }
    const score = Object.values(monkeys).sort((a, b) => b.inspected - a.inspected).slice(0, 2).reduce((p, c) => p * c.inspected,1);
    console.log(score);
});
