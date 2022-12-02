const data = require('fs').readFileSync("./16/input.txt", "utf8");
let bytes = [...BigInt("0x" + data).toString(2).padStart(data.length * 4, '0')];

const BytesToInt = (ba, nbit) => parseInt(ba.slice(pos, (pos += nbit, pos)).join(''), 2);
const BytesToString = (ba, nbit) => ba.slice(pos, (pos += nbit, pos)).join('');

let op = [
    (a) => a.reduce((p, c) => (p = p + c, p), 0),
    (a) => a.reduce((p, c) => (p = p * c, p), 1),
    (a) => Math.min(...a),
    (a) => Math.max(...a),
    (a) => a, //not used just for the show
    (a) => a[0] > a[1] ? 1 : 0,
    (a) => a[0] < a[1] ? 1 : 0,
    (a) => a[0] == a[1] ? 1 : 0,
]

let pos = 0;
function parse(ba) {
    let version = BytesToInt(ba, 3);
    let type = BytesToInt(ba, 3);
    let result = 0;
    if (type == 4) {
        let stop = false;
        let sNumber = '';
        do {
            stop = BytesToString(ba, 1) == '0';
            sNumber += BytesToString(ba, 4);
        } while (!stop);
        result = parseInt(sNumber, 2);
    }
    else {
        let values = [];
        if (BytesToInt(ba, 1)) {
            let packetsCount = BytesToInt(ba, 11);
            for (let pi = 0; pi < packetsCount; pi++) values.push(parse(ba))
        } else {
            let end = BytesToInt(ba, 15) + pos;
            while (pos < end) values.push(parse(ba))
        }
        result = op[type](values);
    }
    return result;
}
let n = parse(bytes);
console.log('result : ' + n);