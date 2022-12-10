const program = require('fs').readFileSync('./10/input.txt', 'utf-8').split("\r\n");
let X = 1, cycles = [];
program.forEach(instruction => {
    cycles.push(X);
    if ("addx" === instruction.slice(0, 4))
        cycles.push(X);
    X += +instruction.slice(5);
});

var CRTLines = cycles.reduce((crt, cx, ci) => (crt[Math.floor(ci / 40)].push(Math.abs(cx - ci % 40) <= 1 ? "#" : "."), crt), [[], [], [], [], [], []]);
console.log(CRTLines.map(crtLines => crtLines.join(" ")).join("\r\n"));