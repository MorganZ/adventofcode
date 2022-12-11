
const input = require('fs').readFileSync('./11/input.txt', 'utf-8');

const getMonkeys = () => input.split("\n\n").map(c => (lines = c.split("\n"),
{
    id: +lines[0].match(/(\d+)/)[1],
    items: lines[1].match(/\d+/g).map(Number),
    op: ((op) => (old) => eval(op.replace(/old/g, old)))(lines[2].match(/= (.*)/)[1]),
    test: +lines[3].match(/(\d+)/)[1],
    to: [+lines[5].match(/(\d+)/)[1], +lines[4].match(/(\d+)/)[1]],
    inspected: 0,
}));

for (const [part, rounds] of [[1, 20], [2, 10000]]) {
    const monkeys = getMonkeys();
    let divisor = monkeys.reduce((acc, monkey) => acc * monkey.test, 1);
    for (let round = 0; round < rounds; round++)
        for (const { id, items, op, test, to } of monkeys) {
            for (let worryLevel of items) {
                switch (part) {
                    case 1: worryLevel = parseInt(op(worryLevel) / 3); break;
                    case 2: worryLevel = op(worryLevel) % divisor; break;
                }
                let divisible = worryLevel % test === 0;
                monkeys[to[+divisible]].items.push(worryLevel);
            }
            monkeys[id].inspected += items.length;
            monkeys[id].items = [];
        }
    const score = Object.values(monkeys).sort((a, b) => b.inspected - a.inspected).slice(0, 2).reduce((p, c) => p * c.inspected, 1);
    console.log(score);
};
