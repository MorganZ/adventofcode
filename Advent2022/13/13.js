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

let input = require('fs').readFileSync('./13/input.txt', 'utf-8');
{
    const signals = input.split("\n\n").map(s => s.split("\n").map(p => JSON.parse(p)));
    let result = signals.map((s, i) => [i, 0 < -1 * compareSignal(s[0], s[1])]).filter(s => s[1]).reduce((p, c) => p + c[0] + 1, 0);
    console.log(result);
}
{
    const dividerPackets = [[[2]], [[6]]]
    const signals = input.split("\n").filter(s => s).map(JSON.parse).concat(dividerPackets);
    let signalsOrdered = signals.sort(compareSignal);
    result = dividerPackets.map(d => signalsOrdered.findIndex(s => s == d) + 1).reduce((a, b) => a * b);
    console.log(result);
}