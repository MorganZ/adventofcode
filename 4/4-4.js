const lines = require('fs').readFileSync("./4/4.txt", "utf8").split("\n\n");
const bingoNumbers = lines.shift().split(",").map(n => +n)
const markedBoard = lines.map(() => Array(25).fill(0));
const boards = lines.map(l => l.replace(/\n/g, ' ').split(' ').filter((e) => e != '').map(n => +n));
const boardsWin = new Set();

for (let bingoNumber of bingoNumbers)
    for (let bi = 0; bi < boards.length; bi++) {
        if (boardsWin.has(bi)) continue;
        const b = boards[bi], mb = markedBoard[bi];
        let foundIndex = b.findIndex((v) => v == bingoNumber);
        if (foundIndex == -1) continue;
        mb[foundIndex] = 1;
        const ri = (foundIndex - foundIndex % 5);//row index
        const ci = foundIndex % 5; //col index
        if (mb[ri] + mb[ri + 1] + mb[ri + 2] + mb[ri + 3] + mb[ri + 4] == 5 ||
            mb[ci] + mb[ci + 5 * 1] + mb[ci + 5 * 2] + mb[ci + 5 * 3] + mb[ci + 5 * 4] == 5) {
            boardsWin.add(bi);
            let score = mb.reduce((p, m, i) => m ? p : p + parseInt(b[i]), 0);
            if (boardsWin.size == boards.length) {
                console.log(score * bingoNumber); return;
            }
        }
    }