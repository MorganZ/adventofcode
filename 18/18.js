let data = require('fs').readFileSync("./18/input.txt", "utf8").split('\n');

function magnetude(tree, i = 0) {
    let v = +tree[i];
    return v > -1 ? v : 3 * magnetude(tree, (i * 2) + 1) + 2 * magnetude(tree, (i * 2) + 2);
}

let pos = -1;
function parseSnailNumber(sn, tree, i = 0, reset = true) {
    let val = +sn[++pos];
    tree[i] = val > -1 ? val : "P";
    if (val > -1) return;
    (parseSnailNumber(sn, tree, (i * 2) + 1, false), pos++);
    (parseSnailNumber(sn, tree, (i * 2) + 2, false), pos++);
    if (reset) pos = -1
}
const stringify = (ba, i = 0) => ba[i] > -1 ? ba[i] : `[${stringify(ba, (i * 2) + 1)},${stringify(ba, (i * 2) + 2)}]`;

function split(tree, i) {
    if (tree[i] > 9) {
        [tree[i], tree[(i * 2) + 1], tree[(i * 2) + 2]] = ["P", Math.floor(tree[i] / 2), Math.ceil(tree[i] / 2)];
        return true;
    }
    return false;
}

function explode(tree, i) {
    if (i % 2 == 1 && tree[i + 1] > -1 && i >= 31) {
        let pId = (i - 1) / 2;
        tree[pId] = 0;
        let [f1, f2] = [tree[i], tree[i + 1]];
        (delete tree[i], delete tree[i + 1]);
        spread(tree, pId, f1, f2);
        return true;
    }
    return false;
}

function spread(tree, parentId, f1, f2, numIndexes = []) {
    traverse(tree, (_, i) => (numIndexes.push(i), false));
    let index = numIndexes.findIndex((e) => e === parentId);
    tree[numIndexes[index - 1]] += f1
    tree[numIndexes[index + 1]] += f2
}

function traverse(tree, action) {
    let stack = [], i = 0;
    while (tree[i] != undefined) {
        if (tree[i] > -1) {
            if (action(tree, i)) return true;
            i = stack.pop() * 2 + 2;
        } else {
            stack.push(i);
            i = (i * 2) + 1;
        }
    }
    return false;
}

let tree = [];
let snailNumber = data[0];
for (let i = 1; i < data.length; i++) {
    tree = [];
    parseSnailNumber(`[${snailNumber},${data[i]}]`, tree);
    while (traverse(tree, explode) || traverse(tree, split)) { }
    snailNumber = stringify(tree);
}
let m = magnetude(tree);
console.log(m);