const program = require('fs').readFileSync('./10/input.txt', 'utf-8').split("\r\n");
const CPU = { X: 1, cycle: [] }
program.forEach(instruction => {
    CPU.cycle.push(CPU.X);
    if ("addx" === instruction.slice(0, 4))
        CPU.cycle.push(CPU.X);
        CPU.X += +instruction.slice(5);
});

const signalStrengths = [20, 60, 100, 140, 180, 220].map(cycle => cycle * CPU.cycle[cycle - 1]);
console.log(signalStrengths.reduce((a, b) => a + b));