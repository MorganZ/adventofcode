
const tf = require("@tensorflow/tfjs");
const { async } = require("regenerator-runtime");
//be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
//fdgacbe cefdb cefbgd gcbe

//[a,b,c,d,e,f,g]
//[0,1,0,0,1,0,0]

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
    let is = []
    let os = []
    let inputs = outputs.map((perm, ouputIndex)  =>{
        let input = D0.map((ds)=>{
            return ds.map((d,i)=> ds[perm[i]])
        });
        for (let i = 0; i < 10; i++) {
            let temp = [...input].map((inr,index)=> [inr, index])
            temp.sort( () => .5 - Math.random() );
            is.push(temp.map(d=>d[0]));
            os.push(temp.map(d=>d[1]))
        }

        return input;
    });
    return {inputs:is, outputs:os}
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
let datas = generateInputoutputs(D0);


let model;

async function initModel() {
    const trainingInputTensor = tf.tensor(datas.inputs);

    const trainingOutputTensor = tf.tensor(datas.outputs);

    // const testInput = generateInputs(10);
    // const testInputTensor = tf.tensor(testInput, [testInput.length, 2]);

    const input = tf.input({shape: [10,7]});
    const denseLayer1 = tf.layers.dense({units: 10, activation: 'relu'});
    const denseLayer2 = tf.layers.dense({units: 10, activation: 'softmax'});
    const output = denseLayer2.apply(denseLayer1.apply(input));
    const model = tf.model({inputs: input, outputs: output});


    // model = tf.();
    // model.add(tf.layers.dense({ inputShape:[10,7] , units: 7, activation: 'sigmoid' }));
     model.compile({
        optimizer: tf.train.adam(0.1),
        loss: 'meanSquaredError'
    });

    await model.fit(trainingInputTensor, trainingOutputTensor, {
        epochs: 100,
        shuffle: true,
        callbacks: {
            onEpochEnd: async (epoch, { loss }) => {
                console.log(epoch)
                console.log(loss)
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



