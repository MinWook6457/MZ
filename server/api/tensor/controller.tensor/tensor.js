const tf = require('@tensorflow/tfjs-node')

const model = tf.sequential()
// Add a dense layer with 1 output unit.
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Specify the loss type and optimizer for training.
model.compile({loss: 'meanSquaredError', optimizer: 'SGD'});


