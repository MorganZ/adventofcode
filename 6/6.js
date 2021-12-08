var fs = require('fs')

fs.readFile("./6/6.txt", "utf8", function (err, data) {
    let ps = data.split(",").map(e => parseInt(e));
    const nbDays = 80;
    let day = 0
    do {
        const nbFish = ps.length;
        for (let p = 0; p < nbFish; p++) {
            const age = ps[p]--;
            if(age==0)
            {
                ps.push(8);
                ps[p] = 6;
            }
        }
        day++;
        console.log(ps);
    } while (day < nbDays)
    console.log(ps.length);
});
