var fs = require('fs')

fs.readFile("./1.txt", "utf8", function (err, data) {
    let l = data.split("\n");
    let count = 0;
    for (let i = 1; i < l.length; i++) {
        count += l[i - 1] - l[i] < 0 ? 1 : 0;
    }
    console.log(count);
});
