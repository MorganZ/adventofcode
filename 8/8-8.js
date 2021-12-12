var fs = require('fs')

function setContains(setA, setB){
    for(var el of setB){
        if(!setA.has(el)){
            return false;
        }
    }
    return true;
}

function setDifference (setA, setB) {
    var difference = new Set(setA);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

fs.readFile("./8/input.txt", "utf8", function (err, data) {
    let l = data.split('\n').map(l => l.split(' | ').map(e => e.split(' ')));
    var sum = 0;
    for (let i = 0; i < l.length; i++) {
        let digits = l[i][0].sort((a,b)=>a.length-b.length).map(d=>new Set([...d].sort()));
        
        var one = digits[0];
        var seven = digits[1];
        var four = digits[2];
        var eight = digits[9];
        var fivedigits = [[3, setContains(digits[3], one)], [4, setContains(digits[4], one)], [5, setContains(digits[5], one)]];
        var three = fivedigits.filter(e=>e[1]).map(e=>digits[e[0]])[0];
        var twoOrFive = fivedigits.filter(e=>!e[1]).map(e=>e[0]);
        var r =  setDifference(four, one);
        var five = digits[ twoOrFive.filter(e=>setContains(digits[e], r))];
        var two = digits[ twoOrFive.filter(e=>!setContains(digits[e], r))];
        var sixDigits = [[6, setContains(digits[6], four)], [7, setContains(digits[7], four)], [8, setContains(digits[8], four)]];
        var nine = sixDigits.filter(e=>e[1]).map(e=>digits[e[0]])[0];
        var zeroOrSix = sixDigits.filter(e=>!e[1]).map(e=>e[0]);
        var zero = digits[ zeroOrSix.filter(e=>setContains(digits[e], seven))];
        var six = digits[ zeroOrSix.filter(e=>!setContains(digits[e], seven))];
        
        var entries = [zero, one, two, three, four, five, six, seven, eight, nine ].map((e, i)=>[[...e].join(''), i]);
        var d = Object.fromEntries(entries);
        
        console.log()
        sum += parseInt(l[i][1].map(e=>d[[...e].sort().join('')]).join(''))
        
    }
    console.log(sum);
    
});


//analyse

const D1 = [0,0,1,0,0,1,0];
const D4 = [0,1,1,1,0,1,0];
const D7 = [1,0,1,0,0,1,0];

const D3 = [1,0,1,1,0,1,1];// 1 with 1 
const D2 = [1,0,1,1,1,0,1];
const D5 = [1,1,0,1,0,1,1];// contient

const D6 = [1,1,0,1,1,1,1];// rest
const D0 = [1,1,1,0,1,1,1];// 1 with 4 

const D9 = [1,1,1,1,0,1,1];// 2 with 1
const D8 = [1,1,1,1,1,1,1];

const possible = [0,1,2,3,4,5,6];




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