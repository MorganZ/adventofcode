const data = require('fs').readFileSync("./16/input.txt", "utf8");
let bin = BigInt("0x" + data).toString(2).padStart(data.length * 4, '0');

let ba = [...bin];

let pos = 0;
const BytesToInt = (ba, nbit) => parseInt(ba.slice(pos, (pos += nbit, pos)).join(''), 2);
const BytesToString = (ba, nbit) => ba.slice(pos, (pos += nbit, pos)).join('');
let sumVersion = 0;
function parse(ba) {
    let version = BytesToInt(ba, 3);
    sumVersion += version;
    let type = BytesToInt(ba, 3);
    if (type == 4) {
        let stop = false;
        let sNumber = '';
        do {
            stop = BytesToString(ba, 1) == '0';
            sNumber += BytesToString(ba, 4);
        } while (!stop);
        let literal = parseInt(sNumber, 2);
    }
    else {
        if (BytesToInt(ba, 1)) {
            let packetsCount = BytesToInt(ba, 11);
            for (let pi = 0; pi < packetsCount; pi++) parse(ba)
        } else {
            let packetsSize = BytesToInt(ba, 15);
            let end = pos + packetsSize;
            do {
                parse(ba);
            } while (pos < end)
        }
    }
}

parse(ba);

console.log(sumVersion)