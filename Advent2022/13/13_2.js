let input = require('fs').readFileSync('./13/input.txt', 'utf-8');
let dividerPacket = ["[[2]]", "[[6]]"]
dividerPacket.forEach(d => input += '\n' + d);

const signals = input.split("\n").filter(s => s.length > 0).map(s => JSON.parse(s));

const compareSignal = (s1, s2) => {
    if (Number.isInteger(s1) && Number.isInteger(s2)) return Math.sign(s1 - s2);
    if (Array.isArray(s1) && Array.isArray(s2))
        for (let i = 0; i < s1.length || i < s2.length; i++) {
            let a = s1[i]?? -1;
            let b = s2[i]?? -1;
            if(a == -1 || b == -1) {
                if(a == -1) return -1;
                if(b == -1) return 1;
            }
            const result = compareSignal(a, b);
            if (result != 0) return result;
        }
    if (Number.isInteger(s1)) return compareSignal([s1], s2);
    if (Number.isInteger(s2)) return compareSignal(s1, [s2]);
    return 0;
}
let signalsOrdered = signals.sort((a, b) => compareSignal(a, b)).map(s => JSON.stringify(s));
let result = dividerPacket.map(d => signalsOrdered.findIndex(s => s == d) + 1).reduce((a, b) => a * b);
console.log(signalsOrdered.join("\n")); //debug
console.log(result);
