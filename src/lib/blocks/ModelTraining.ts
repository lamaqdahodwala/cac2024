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
			message0:
				'Train ML model %1 Model variable: %2 %3 on data %4 %5 Target values %6 %7 With Config %8',
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
		const variable_config = generator.valueToCode(block, 'config', Order.ATOMIC);

		const code = `await model.fit(${variable_dataset}, ${variable_target}, ${variable_config})`;
		return code;
	}
}

class TrainingLoopBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'trainingBlockConfiguration',
			tooltip: '',
			helpUrl: '',
			message0: 'Training Block Configuration %1 Epochs %2 %3 Epochs %4 %5',
			args0: [
				{
					type: 'input_dummy',
					name: 'NAME'
				},
				{
					type: 'field_number',
					name: 'epochs',
					value: 0
				},
				{
					type: 'input_dummy',
					name: 'epochs',
					align: 'RIGHT'
				},
				{
					type: 'field_number',
					name: 'batch',
					value: 0
				},
				{
					type: 'input_dummy',
					name: 'batch',
					align: 'RIGHT'
				}
			],
			output: null,
			colour: 105
		};
	}

	getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
		const epochs = block.getFieldValue('epochs');
		const batchSize = block.getFieldValue('batch');
		return [ `{epochs: ${epochs},batchSize: ${batchSize}}`, Order.NONE];
	}
}

export const ModelTrainingCategory = CreateCategory(
	[TrainModelBlock, TrainingLoopBlock],
	'Model Training'
);
