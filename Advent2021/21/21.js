let p = [1, 6], ps = [0, 0], dice = 0, pid = 1;
while (true) {
    pid ^= 1, dice += 3;
    p[pid] = (p[pid] + 3 * dice - 3 - 1) % 10 + 1;
    ps[pid] += p[pid];
    if (ps[pid] >= 1000) { console.log(Math.min(...ps) * dice); break }
}