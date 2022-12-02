const l = require('fs').readFileSync("3.txt", "utf8").split("\n");
const ndigit = l[0].length;
const nrow = l.length;
const limit = nrow / 2;
let gama = 0;
for (let d = ndigit - 1; 0 <= d; d--) {
    let counter = 0;
    for (let r = 0; r < nrow && counter < limit; r++) {
        counter += parseInt(l[r][d]);
    }
    gama += (counter < limit ? 0 : 1) << (ndigit - 1 - d);
}
let mask = (1 << ndigit) - 1;
let epsilone = ~gama & mask;
console.log(gama * epsilone);