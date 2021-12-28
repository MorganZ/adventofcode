from itertools import *
lines = read_data('input.txt')
t = 0
do = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"]
req = set(do)
for k in lines:
    b10, b4 = k.split(" | ")
    b10_sorted = list(map(lambda x: set(x),sorted(b10.split(), key = len)))
    cf = b10_sorted[0]
    a = b10_sorted[1] - cf
    bd = b10_sorted[2] - cf
    eg = b10_sorted[-1] - cf - a - bd
    cf, a, bd, eg = list(cf), list(a), list(bd), list(eg)
    #print(a, bd, cf, eg)
    for i in range(8):
        perm = list(map(lambda x: int(x), list(f'{i:03b}')))
        p = a[0] + bd[perm[0]] + cf[perm[1]] + bd[(perm[0] + 1) % 2] + eg[perm[2]] + cf[(perm[1] + 1) % 2] + eg[(perm[2] + 1) % 2]
        #print('p: ', p)
        m = {i: j for i, j in zip(p, "abcdefg")}
        #print(p, m)
        r = {"".join(sorted(map(m.get, q))) for q in b10.split()}
        #print('r: ',sorted(r, key=len))
        if r == req:
            #print('succes')
            b4 = ["".join(sorted(map(m.get, q))) for q in b4.split()]
            b4 = "".join(str(do.index(q)) for q in b4)
            t += int(b4)
    #break
print(t)