var fs = require('fs')
var m = [];
fs.readFile("./5/5.txt", "utf8", function (err, data) {
    let l = data.split("\n");

    for (let index = 0; index < l.length; index++) {
        let [x1, y1, x2, y2] = l[index].replace(" -> ", ",").split(",").map(c => parseInt(c));
        if (x1 == x2 || y1 == y2) {
            const isHorizontal = y1 == y2;
            if (isHorizontal) {
                [x1, x2] = x1 < x2 ? [x1, x2] : [x2, x1];
                for (let x = x1; x <= x2; x++) {
                    m[x + "-" + y1] = (m[x + "-" + y1] ?? 0)+1;
                }
            }
            else {
                [y1, y2] = y1 < y2 ? [y1, y2] : [y2, y1];
                for (let y = y1; y <= y2; y++) {
                    m[x1 + "-" + y] = (m[x1 + "-" + y] ?? 0)+1;
                }
            }
        }
    }

    var count = Object.values(m).filter((value)=> value >=2 );
    console.log(count.length);
});
