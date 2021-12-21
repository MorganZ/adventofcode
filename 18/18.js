let data = require('fs').readFileSync("./18/input.txt", "utf8").split('\n');

function magnetude(tree, i = 0) {
    let v = +tree[i];
    return v > -1 ? v : 3 * magnetude(tree, (i * 2) + 1) + 2 * magnetude(tree, (i * 2) + 2);
}

let pos = -1;
function traverseParse(sn, tree, i = 0, reset = true) {
    let val = +sn[++pos];
    tree[i] = val > -1 ? val : "P";
    if (val > -1) return;
    (traverseParse(sn, tree, (i * 2) + 1, false), pos++);
    (traverseParse(sn, tree, (i * 2) + 2, false), pos++);
    if (reset) pos = -1
}

const stringify = (ba, i = 0) => ba[i] > -1 ? ba[i] : `[${stringify(ba, (i * 2) + 1)},${stringify(ba, (i * 2) + 2)}]`;


function split(tree) {
    let stack = [], i = 0;
    do {
        if (tree[i] == "P") {
            stack.push(i);
            i = (i * 2) + 1;
        } else if (tree[i] > -1) {
            if (tree[i] > 9) {
                [tree[i], tree[(i * 2) + 1], tree[(i * 2) + 2]] = ["P", Math.floor(tree[i] / 2), Math.ceil(tree[i] / 2)];
                return true;
            }
            i = stack.pop() * 2 + 2;
        }
    } while (tree[i] != undefined)

    return false;
}

function explode(tree) {
    let stack = [], i = 0;
    do {
        if (tree[i] == "P") {
            stack.push(i);
            i = (i * 2) + 1;
        } else if (tree[i] > -1) {
            if (i % 2 == 1 && tree[i + 1] > -1 && i >= 31) {
                let pId = (i - 1) / 2
                tree[pId] = 0;
                let f1 = tree[i];
                let f2 = tree[i + 1];
                delete tree[i];
                delete tree[i + 1];
                let orders = getNumbersIndex(tree);
                var index = orders.findIndex((e) => e === pId);
                tree[orders[index - 1]] += f1
                tree[orders[index + 1]] += f2
                return true;
            }
            i = stack.pop() * 2 + 2;
        }
    } while (tree[i] != undefined)
    return false;
}

function getNumbersIndex(tree) {
    let result = [], stack = [], i = 0;
    do {
        if (tree[i] == "P") {
            stack.push(i);
            i = (i * 2) + 1;
        } else if (tree[i] > -1) {
            result.push(i);
            i = stack.pop() * 2 + 2;
        }
    } while (tree[i] != undefined)
    return result;
}

function reduce(a) {
    let excep = true;
    let tree = [];
    traverseParse(a, tree);
    while (excep) {
        excep = explode(tree) || split(tree);
    }
    return tree;
}


let tree = [];
let snailNumber = data[0];
for (let i = 1; i < data.length; i++) {
    const b = data[i];
    tree = reduce(`[${snailNumber},${b}]`);
    snailNumber = stringify(tree);
}
let m = magnetude(tree);
console.log(m);




function test(a, b) {
    let sn = reduce(a)
    if (sn != b) {
        console.log('erreur');
        console.log(sn);
        console.log(b);
        console.log('erreur');
    }
    else console.log('win')
}





// test("[[[[[9,8],1],2],3],4]", "[[[[0,9],2],3],4]");
// test("[7,[6,[5,[4,[3,2]]]]]", "[7,[6,[5,[7,0]]]]");
// test("[[6,[5,[4,[3,2]]]],1]", "[[6,[5,[7,0]]],3]");
// test("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]", "[[3,[2,[8,0]]],[9,[5,[7,0]]]]");
//test("", "");


