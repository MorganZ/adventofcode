var fs = require('fs')

fs.readFile("2.txt", "utf8", function (err, data) {
    let l = data.split("\n");
    let x=0;let d=0;let a=0;

    for (let i = 0; i < l.length; i++) {
        let value = parseInt( [...l[i]].reverse()[0]);
        switch (l[i][0]) {
            case 'd':
                a+=value;
                break;
            case 'u':
                a-=value;
                break;
            case 'f':
                x+= value;
                d+= value*a;
                break;
            default:
                break;
        }
    }
    console.log(x*d)
});