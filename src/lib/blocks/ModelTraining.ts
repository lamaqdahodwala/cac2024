import { CreateCategory, type BlocklyJson, type BlockReturningValue, type CustomBlock } from '../abstract/BlocklyInterface';
import type { Block } from 'blockly';
import { Order, type JavascriptGenerator } from 'blockly/javascript';

class BeginModelTrainingBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Begin_Model_Training_Block',
            tooltip: 'Begin training a model with a specified dataset and training loop',
            helpUrl: '',
            message0: 'Begin training model %1 with data %2 and training loop %3',
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
        const dataset = block.getFieldValue('DATASET');
        const trainingLoop = generator.statementToCode(block, 'TRAINING_LOOP');
    }
}

class CustomTrainingLoopBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Custom_Training_Loop_Block',
            tooltip: 'Define a custom training loop for the model',
            helpUrl: '',
            message0: 'Epochs: %1 Batch Size: %2 Callbacks: %3',
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
        const callbacks = block.getFieldValue('CALLBACKS');

        return `code = await const trainingLoop = {epochs: ${epochs}, batchSize: ${batchSize}, callbacks: ${callbacks}};`;
    }
}

export const ModelTraningCategory = CreateCategory([BeginModelTrainingBlock, CustomTrainingLoopBlock], "Model Training");
