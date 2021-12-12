
const tf = require("@tensorflow/tfjs");
const { async } = require("regenerator-runtime");


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


let D0 =  [[1,1,1,0,1,1,1], 
            [0,0,1,0,0,1,0],
            [1,0,1,1,1,0,1],
            [1,0,1,1,0,1,1], 
            [0,1,1,1,0,1,0],
            [1,1,0,1,0,1,1],
            [1,1,0,1,1,1,1],
            [1,0,1,0,0,1,0],
            [1,1,1,1,1,1,1],
            [1,1,1,1,0,1,1]]
var datas = generateInputoutputs(D0);


let model;

async function initModel() {
    const trainingInput =datas.inputs;//.map(d=>d.reduce((p,c)=>p.concat(c), [])) ;
    const trainingInputTensor = tf.tensor(trainingInput);

    const trainingOutput = datas.outputs;
    const trainingOutputTensor = tf.tensor(trainingOutput);

    // const testInput = generateInputs(10);
    // const testInputTensor = tf.tensor(testInput, [testInput.length, 2]);

    model = tf.sequential();
    model.add(tf.layers.dense({ inputShape:[10, 7] , units: 10, activation: 'sigmoid' }));
    model.compile({
        optimizer: tf.train.adam(0.1),
        loss: 'meanSquaredError'
    });

    await model.fit(trainingInputTensor, trainingOutputTensor, {
        epochs: 1000,
        shuffle: true,
        callbacks: {
            onEpochEnd: async (epoch, { loss }) => {
                // changeLossHistory((prevHistory) => [...prevHistory, {
                //     epoch,
                //     loss
                // }]);

                //const output = model.predict(testInputTensor).arraySync();
                //console.log(output);
                // changeData(() => output.map(([out], i) => ({
                //     out,
                //     x1: testInput[i][0],
                //     x2: testInput[i][1]
                // })));
                await tf.nextFrame();
            }
        }
    })
}

async function test(){
    await initModel();
    const testInput =  [[0, 0], [1, 0], [0, 1], [1, 1]]// generateInputs(10);
    console.log(testInput);
    const testInputTensor = tf.tensor(testInput, [testInput.length, 2]);
    const output = model.predict(testInputTensor).arraySync();
    console.log("tets");
    console.log(output);
}


test();



