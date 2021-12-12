
var fs = require('fs')

fs.readFile("./9/input.txt", "utf8", function (err, data) {
    let l = data.split("\n").map((e)=>e.split('').map(n=>parseInt(n)));
    
    let sum = 0;
    for (let r = 0; r < l.length; r++) {
        const row = l[r];
        for (let c = 0; c < row.length; c++) {
            const col = row[c];
            let adjacent = [(l[r-1]??[])[c]??9, (l[r+1]??[])[c]??9, (l[r]??[])[c-1]??9, (l[r]??[])[c+1]??9]
            var isLower =  adjacent.reduce((p,c)=> p && c>col, true);
            if(isLower){
                sum += col+1
            }
        }
        
    }
    console.log(sum);
});
