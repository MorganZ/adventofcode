const input = require('fs').readFileSync('./11/input.txt', 'utf-8');
const getMonkeys = () => input.split("\n\n").map(c => (lines = c.split("\n"),
{
    id: +lines[0].match(/(\d+)/)[1],
    items: lines[1].match(/\d+/g).map(Number),
    op: ((op) => (old) => eval(op.replace(/old/g, old)))(lines[2].split('=')[1]),
    test: +lines[3].match(/(\d+)/)[1],
    to: [+lines[5].match(/(\d+)/)[1], +lines[4].match(/(\d+)/)[1]],
    inspected: 0,
}));

for (let [part, rounds] of [[1, 20], [2, 10000]]) {
    const monkeys = getMonkeys();
    let divisor = monkeys.reduce((acc, monkey) => acc * monkey.test, 1);
    for (let i = 0; i < rounds; i++) {
        monkeys.forEach(monkey => {
            monkey.items = monkey.items.map(worryLevel => {
                let newValue;
                switch (part) {
                    case 1: newValue = parseInt(monkey.op(worryLevel) / 3); break;
                    case 2: newValue = monkey.op(worryLevel) % divisor; break;
                }
                monkeys[monkey.to[+!(newValue % monkey.test)]].items.push(newValue);
                return newValue;
            });
            monkey.inspected += monkey.items.length;
            monkey.items = [];
        });
    }
    console.log(monkeys.map(m => m.inspected).sort((a, b) => b - a).slice(0, 2).reduce((p, c) => p * c));
};
