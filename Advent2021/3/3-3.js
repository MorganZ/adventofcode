function BuildBinaryTree(el, binaryString) {
    if (binaryString.length > 0) {
        if (el.count == 0) {
            el['0'] = { count: 0 };
            el['1'] = { count: 0 };
        }
        let digit = binaryString.shift();
        el.count += 1;
        BuildBinaryTree(el[digit], binaryString);
    }
}

function findStrongDigit(el) {
    if (el['0'].count + el['1'].count == 0) return '';
    const digit = el['0'].count > el['1'].count ? '0' : '1';
    return digit + findStrongDigit(el[digit]);
}

function findWeakDigit(el) {
    if (el['0'].count + el['1'].count == 0) return '';
    let digit;
    if ((el['0'].count + el['1'].count) == 1) {
        digit = el['0'].count > el['1'].count ? '0' : '1';
    } else {
        digit = el['0'].count <= el['1'].count ? '0' : '1';
    }
    return digit + findWeakDigit(el[digit]);
}

const l = require('fs').readFileSync("./3/3.txt", "utf8").split("\n");
const root = { count: 0 }
for (let r = 0; r < l.length; r++) {
    BuildBinaryTree(root, [...l[r]]);
}
let ogr = parseInt(findStrongDigit(root), 2);
let csr = parseInt(findWeakDigit(root), 2);
console.log(ogr * csr);