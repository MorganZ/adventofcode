var fs = require('fs')

function setContains(setA, setB){
    for(var el of setB){
        if(!setA.has(el)){
            return false;
        }
    }
    return true;
}

function difference (setA, setB) {
    var difference = new Set(setA);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

fs.readFile("./8/input.txt", "utf8", function (err, data) {
    let l = data.split('\r\n').map(l => l.split(' | ').map(e => e.split(' ').sort((a,b)=>a.length-b.length)));
    
    const D1 = [0,0,1,0,0,1,0];
    const D7 = [1,0,1,0,0,1,0];
    const D4 = [0,1,1,1,0,1,0];
    
    const D2 = [1,0,1,1,1,0,1];
    const D3 = [1,0,1,1,0,1,1];// 1 with 1 
    const D5 = [1,1,0,1,0,1,1];
    
    const D0 = [1,1,1,0,1,1,1];// 1 with 4 
    const D6 = [1,1,0,1,1,1,1];// rest
    const D9 = [1,1,1,1,0,1,1];// 2 with 1
        
    const D8 = [1,1,1,1,1,1,1];

    const possible = [0,1,2,3,4,5,6];
    for (let i = 0; i < l.length; i++) {
        let digits = l[i][0].map(d=>new Set([...d]));

        var one = digits[0];
        var seven = digits[1];
        var four = digits[2];
        var heigth = digits[7]
        var t = setContains(digits[3], one) ;
        var result1 = setContains(digits[4], one);
        var result2 = setContains(digits[5], one);

        console.log("sdf");
    }

});



const D0 = [1,1,1,0,1,1,1];// 1 with 4 
const D1 = [0,0,1,0,0,1,0];
const D2 = [1,0,1,1,1,0,1];
const D3 = [1,0,1,1,0,1,1];// 1 with 1 
const D4 = [0,1,1,1,0,1,0];
const D5 = [1,1,0,1,0,1,1];
const D6 = [1,1,0,1,1,1,1];// rest
const D7 = [1,0,1,0,0,1,0];
const D8 = [1,1,1,1,1,1,1];
const D9 = [1,1,1,1,0,1,1];// 2 with 1
   



// fbcad: 3 contient 1
// cagedb: 0 un seul du restant 4 dont f
// cefabd: 9 contient 1
// cdfgeb: 6 il reste
// cdfbe: 5 contient e
// gcdfa: 2 restant
// acedgfb: 8
// dab: 7
// eafb: 4 moins 1 ef
// ab: 1 