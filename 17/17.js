let data = require('fs').readFileSync("./17/input.txt", "utf8");
[_, ylimit] = data.slice(13, data.length).split(', ').map(c => c.split("=")[1].split('..').map(c => +c));

if(ylimit[0]<=0 && 0 <=ylimit[1]){
    console.log('infinit alt');
}else{
    let [ymin, ymax] = [Math.abs(ylimit[0]),Math.abs(ylimit[1])];
    let lastVelBeforeZero = ymin > ymax ? ymin - 1 : ymax + 1;
    let alt = lastVelBeforeZero * (lastVelBeforeZero + 1) / 2;
    console.log(alt);
}

