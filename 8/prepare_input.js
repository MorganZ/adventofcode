
const permutations = arr => {
    if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
    return arr.reduce(
        (acc, item, i) =>
            acc.concat(
                permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
                    item,
                    ...val,
                ])
            ),
        []
    );
};

function generateInputoutputs(D0) {
    let outputs = permutations(Array(D0[0].length).fill(0).map((v,i)=>i));
    let inputs = outputs.map(perm =>{
        let input = D0.map((ds)=>{
            return ds.map((d,i)=> ds[perm[i]])
        });
        return input;
    });
    return {inputs, outputs}
}


let D0 = [[1, 1, 1],
[1, 0, 0],
[0, 1, 0],
[0, 0, 1],
[1, 0, 0]];

let r = generateInputoutputs(D0);

console.log(r);