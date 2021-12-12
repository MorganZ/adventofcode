var fs = require('fs')
var m = [];
fs.readFile("./7/input.txt", "utf8", function (err, data) {
    let l = data.split(",").map(s => parseInt(s)).sort((a, b) => a - b);
//??

    console.log(energy);
});
