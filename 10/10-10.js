const fs = require('fs');

fs.readFile("./10/input.txt", "utf8", function (err, data) {
    let l = data.split("\n").map((e) => e.split(''));
    let points = {
        "(": 1,
        "[": 2,
        "{": 3,
        "<": 4,
    };
    let list = [];
    for (let r = 0; r < l.length; r++) {
        let stack = []
        let pass = false;
        for (let c = 0; c < l[r].length; c++) {
            const current = l[r][c];
            if (')]}>'.includes(current)) {
                if(!"()[]{}<>".includes(stack.pop()+current)){
                    pass = true;
                    break;
                }
            }
            else {
                stack.push(current);
            }
        }
        if(pass) continue;
        stack.reverse();
        let sum = 0;
        for (let i = 0; i < stack.length; i++) {
            const c = stack[i];
            sum = sum*5+points[c];
        }
        list.push(sum);
    }
    console.log(list.sort((a,b)=>b-a)[Math.ceil(list.length/2)-1])
});
