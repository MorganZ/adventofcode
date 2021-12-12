const fs = require('fs');

fs.readFile("./10/input.txt", "utf8", function (err, data) {
    let l = data.split("\n").map((e) => e.split(''));
    let sum = 0;
    let points = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
    };

    for (let r = 0; r < l.length; r++) {
        let stack = []
        for (let c = 0; c < l[r].length; c++) {
            const current = l[r][c];
            if (')]}>'.includes(current)) {
                const pre = stack.pop();
                if(!"()[]{}<>".includes(pre+current)){
                    sum += points[current];
                    break;
                }
            }
            else {
                stack.push(current);
            }
        }
    }
    console.log(sum);
});
