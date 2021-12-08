var fs = require('fs')

fs.readFile("./4/4.txt", "utf8", function (err, data) {
    const l = data.split("\n\n");
    const bingo = l.shift().split(",");
    const markedBoard = []
    const boards = []
    for (let index = 0; index < l.length; index++) {
        const board = l[index];
        markedBoard[index] = Array(25).fill(0);
        boards[index] = board.replace(/\n/g, ' ').split(' ').filter((e) => e != '');
    }

    for (let i = 0; i < bingo.length; i++) {
        const bingoNumber = bingo[i];
        for (let bi = 0; bi < boards.length; bi++) {
            const b = boards[bi];
            const mb = markedBoard[bi]
            let ii = b.findIndex((v) => v == bingoNumber);
            if (ii == -1) continue;
            mb[ii] = 1;
            const ri = (ii - ii % 5);
            const ci = ii % 5;
            if (mb[ri] + mb[ri + 1] + mb[ri + 2] + mb[ri + 3] + mb[ri + 4] == 5 ||
                mb[ci] + mb[ci + 5 * 1] + mb[ci + 5 * 2] + mb[ci + 5 * 3] + mb[ci + 5 * 4] == 5) {
                let total = 0;
                for (let mi = 0; mi < mb.length; mi++) {
                    if (mb[mi] == 0) {
                        total += parseInt(b[mi]);
                    }
                }
                console.log(total * bingoNumber);
                return;
            }
        }
    }
});
