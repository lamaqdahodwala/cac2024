import {
	CreateCategory,
	type BlocklyJson,
	type BlockReturningValue,
	type CustomBlock,
	type InputMapMutator,
	type InputMapType
} from '../abstract/BlocklyInterface';
import type { Block } from 'blockly';
import { Order, type JavascriptGenerator } from 'blockly/javascript';

class TrainModelBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'trainModelBlock',
			tooltip: '',
			helpUrl: '',
			message0: 'Train ML model %1 Model variable: %2 %3 on data %4 %5 Target values %6 %7 With Config %8',
			args0: [
				{
					type: 'input_dummy',
					name: 'label',
					align: 'RIGHT'
				},
				{
					type: 'field_variable',
					name: 'model',
					variable: 'model'
				},
				{
					type: 'input_dummy',
					name: 'model_input'
				},
				{
					type: 'field_variable',
					name: 'dataset',
					variable: 'dataset'
				},
				{
					type: 'input_dummy',
					name: 'trainingdata'
				},
				{
					type: 'field_variable',
					name: 'target',
					variable: 'targets'
				},
				{
					type: 'input_dummy',
					name: 'targetvalue'
				},
				{
					type: 'input_value',
					name: 'config',
					align: 'RIGHT'
				}
			],
			previousStatement: null,
			nextStatement: null,
			colour: 225
		};
	}

	getCodeForGenerator(block: Block, generator: JavascriptGenerator) {
		const variable_model = generator.getVariableName(block.getFieldValue('model'));
		const variable_dataset = generator.getVariableName(block.getFieldValue('dataset'));
		const variable_target = generator.getVariableName(block.getFieldValue('target'));

		const code = `await model.fit(${variable_dataset}, ${variable_target})`;
		return code;
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
			colour: 180
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

export const ModelTrainingCategory = CreateCategory(
	[TrainModelBlock, TrainingLoopBlock],
	'Model Training'
);
