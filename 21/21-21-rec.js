let diceValues = [1, 2, 3];
let possibleRolls = diceValues.flatMap(d1 => diceValues.flatMap(d2 => diceValues.flatMap(d3 => d1 + d2 + d3)));
let cache = new Map();
function play(p0, p1, s0 = 0, s1 = 0) {
    let k = [p0, p1, s0, s1].join(',');
    if (cache.get(k)) return cache.get(k);
    let oc = [BigInt(0), BigInt(0)]
    for (let r of possibleRolls) {
        p0t = (p0 + r - 1) % 10 + 1;
        s0t = s0 + p0t;
        if (s0t >= 21) {
            oc[0] += 1n;
        }
        else {
            let [dy, dx] = play(p1, p0t, s1, s0t);
            oc[0] += dx;
            oc[1] += dy;
        }
    }
    cache.set(k, oc);
    return oc;
}

let r = play(1,6)
console.log(r[0] > r[1] ? r[0] : r[1]);