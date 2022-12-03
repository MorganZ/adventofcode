
const fs = require('fs');

const data = fs.readFileSync('./1/1.txt', 'utf8');

var rations = data.split("\r\n\r\n").map(r=>r.split("\r\n").map(r=>parseInt(r)).reduce((p,c)=>p+c,0))

var elvesRation = Math.max(...rations);
var sumTop3 =  rations.sort((a,b)=>b-a).slice(0,3).reduce((p,c)=>p+c,0);

console.log(sumTop3);