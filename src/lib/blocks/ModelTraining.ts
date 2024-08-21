import { CreateCategory, type BlocklyJson, type BlockReturningValue, type CustomBlock } from '../abstract/BlocklyInterface';
import type { Block } from 'blockly';
import { Order, type JavascriptGenerator } from 'blockly/javascript';

class TrainModelBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Train_Model_Block',
            tooltip: 'Train a model with the specified dataset and training loop',
            helpUrl: '',
            message0: 'Train model %1 with data %2 and training loop %3',
            args0: [
                {
                    type: 'field_input',
                    name: 'MODEL_NAME',
                    text: 'model'
                },
                {
                    type: 'field_input',
                    name: 'DATASET',
                    text: 'dataset'
                },
                {
                    type: 'input_statement',
                    name: 'TRAINING_LOOP'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 230,
        };
    }

    getCodeForGenerator(block: Block, generator: JavascriptGenerator) {
        const modelName = block.getFieldValue('MODEL_NAME');
        const datasetName = block.getFieldValue('DATASET');
        const trainingLoop = generator.statementToCode(block, 'TRAINING_LOOP');

        return `const ${modelName} = tf.sequential();
            const ${datasetName} = await loadDataset('${datasetName}');
            ${trainingLoop}
            const trainModel = async () => {await ${modelName}.compile({optimizer: 'adam',loss: 'categoricalCrossentropy',metrics: ['accuracy'],});await ${modelName}.fit(${datasetName}.xTrain, ${datasetName}.yTrain, trainingLoop);};
            trainModel();`;
    }
}

class TrainingLoopBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Training_Loop_Block',
            tooltip: 'Define a custom training loop for the model',
            helpUrl: '',
            message0: 'Epochs: %1 Batch Size: %2 Validation Split: %3 Callbacks: %4',
            args0: [
                {
                    type: 'field_number',
                    name: 'EPOCHS',
                    value: 10
                },
                {
                    type: 'field_number',
                    name: 'BATCH_SIZE',
                    value: 32
                },
                {
                    type: 'field_number',
                    name: 'VALIDATION_SPLIT',
                    value: 0.2
                },
                {
                    type: 'field_input',
                    name: 'CALLBACKS',
                    text: 'callbacks'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 180,
        };
    }

    getCodeForGenerator(block: Block, generator: JavascriptGenerator) {
        const epochs = block.getFieldValue('EPOCHS');
        const batchSize = block.getFieldValue('BATCH_SIZE');
        const validationSplit = block.getFieldValue('VALIDATION_SPLIT');
        const callbacks = block.getFieldValue('CALLBACKS');
        return `const trainingLoop = {epochs: ${epochs},batchSize: ${batchSize},validationSplit: ${validationSplit},callbacks: ${callbacks}};`;
    }
}

export const ModelTrainingCategory = CreateCategory([TrainModelBlock, TrainingLoopBlock], "Model Training");
