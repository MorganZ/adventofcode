var fs = require('fs')

fs.readFile("1.txt", "utf8", function (err, data) {
    let l = data.split("\n");
    let count = 0;
    for (let i = 0; i < l.length-3; i++) {
        count += l[i] - l[i+3]  < 0 ? 1 : 0;
    }
    console.log(count);
});
