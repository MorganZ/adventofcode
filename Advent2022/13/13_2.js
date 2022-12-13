let signals = require('fs').readFileSync('./13/input.txt', 'utf-8').split("\n").filter(s => s.length).map(JSON.parse).concat(dividerPacket = [[[2]], [[6]]]);
const compareSignal = (s1, s2) => {
    if (Number.isInteger(s1) && Number.isInteger(s2)) return Math.sign(s1 - s2);
    if (Array.isArray(s1) && Array.isArray(s2)) {
        for (let i = 0; i < s1.length && i < s2.length; i++) {
            const result = compareSignal(s1[i], s2[i]);
            if (result != 0) return result;
        }
        return Math.sign(s1.length - s2.length);
    }
    return Number.isInteger(s1) ? compareSignal([s1], s2) : compareSignal(s1, [s2]);
}
let signalsOrdered = signals.sort(compareSignal);
let result = dividerPacket.map(d => signalsOrdered.findIndex(s => s == d) + 1).reduce((a, b) => a * b);
console.log(result);