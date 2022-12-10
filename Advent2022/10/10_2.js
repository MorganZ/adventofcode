const program = require('fs').readFileSync('./10/input.txt', 'utf-8').split("\r\n");
const CPU = { X: 1, cycle: [] }
program.forEach(instruction => {
    CPU.cycle.push(CPU.X);
    if ("addx" === instruction.slice(0, 4))
        CPU.cycle.push(CPU.X);
        CPU.X += +instruction.slice(5);
});

var CRTBeam = CPU.cycle.map((cx, ci) => (cx = (cx + 1) % 40, (cx === (ci) % 40 || cx === (ci + 1) % 40 || cx === (ci + 2) % 40) ? "x" : "."));
var CRTLines = CRTBeam.reduce((crt, pixel, beamIndex) => (crt[Math.floor(beamIndex / 40)].push(pixel), crt), [[], [], [], [], [], []]);
console.log(CRTLines.map(crtLines => crtLines.join(" ")).join("\r\n"));