import * as tf from '@tensorflow/tfjs';

import {
	CreateCategory,
	createCustomBlock,
	createMutatedBlock,
	MutatedBlock,
	useInputMap,
	type BlockReturningValue,
	type InputMapMutator,
	type InputMapType,
	type MutatedBlocklyJson
} from '$lib/abstract/BlocklyInterface';
import { Order } from 'blockly/javascript';


let DenseLayer = createCustomBlock(
	{
		type: 'Dense_Layer',
		tooltip: 'A densely connected layer',
		helpUrl: '',
		message0: 'A dense layer %1 with %2 units %3 and %4 activation %5',
		args0: [
			{
				type: 'input_dummy',
				name: 'NAME'
			},
			{
				type: 'field_number',
				name: 'units',
				value: 0
			},
			{
				type: 'input_dummy',
				name: 'fjidoaspjfeiwaj'
			},
			{
				type: 'field_dropdown',
				name: 'optimizerChoice',
				options: [
					['Softmax', 'softmax'],
					['ReLU', 'relu']
				]
			},
			{
				type: 'input_dummy',
				name: 'optimizer'
			}
		],
		output: null,
		colour: 120,
    // mutator: useInputMap(DenseLayerMutation)
	},
	(block, generator): BlockReturningValue => {
		const number_name = block.getFieldValue('units');

		const dropdown_optimizerchoice = block.getFieldValue('optimizerChoice');

		// TODO: Assemble javascript into the code variable.
		const code = `tf.layers.dense({units: ${number_name}, activation: "${dropdown_optimizerchoice}"})`;
		// TODO: Change Order.NONE to the correct operator precedence strength
		return [code, Order.ATOMIC];
	}
);

let AddLayerToModel = createCustomBlock(
	{
		type: 'addLayerToModel',
		tooltip: 'Add a layer to a model variable',
		helpUrl: '',
		message0: 'Add layer: %1 to model: %2 %3',
		args0: [
			{
				type: 'input_value',
				name: 'layer'
			},
			{
				type: 'field_variable',
				name: 'modelVar',
				variable: 'model'
			},
			{
				type: 'input_dummy',
				name: 'modelVar'
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 180
	},
	(block, generator) => {
		const value_layer = generator.valueToCode(block, 'layer', Order.ATOMIC);
		const variable_name = generator.getVariableName(block.getFieldValue('modelVar'));

		const code = `${variable_name}.add(${value_layer})`;
		return code;
	}
);

let NewModel = createCustomBlock(
	{
		type: 'createModel',
		tooltip: 'Add a layer to a model variable',
		helpUrl: '',
		message0: 'Create a new empty ML model %1',
		args0: [
			{
				type: 'input_dummy',
				name: 'layer'
			}
		],
		output: null,
		colour: 180
	},
	(block, generator) => {
		return ['tf.sequential()', Order.ATOMIC];
	}
);

let ModelSummary = createCustomBlock(
	{
		type: 'summary',
		tooltip: 'Add a layer to a model variable',
		helpUrl: '',
		message0: 'Show layers of model %1 %2',
		args0: [
			{
				type: 'field_variable',
				name: 'model',
				variable: 'model'
			},
			{
				type: 'input_dummy',
				name: 'layer'
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 180
	},
	(block, generator) => {
		const variable_model = generator.getVariableName(block.getFieldValue('model'));

		const code = `appendToLog(${variable_model}.summary())`;
		return code;
	}
);

const FlattenLayer = createCustomBlock(
	{
		type: 'flattenLayer',
		tooltip: '',
		helpUrl: '',
		message0: 'Flatten Layer %1',
		args0: [
			{
				type: 'input_dummy',
				name: 'NAME'
			}
		],
		output: null,
		colour: 120
	},
	(block, generator): BlockReturningValue => {
		return ['tf.layers.flatten({inputShape: [28, 28, 3]})', Order.ATOMIC];
	}
);


export const LayersCategory = CreateCategory(
	[NewModel, AddLayerToModel, DenseLayer, FlattenLayer, ModelSummary],
	'Layers'
);
