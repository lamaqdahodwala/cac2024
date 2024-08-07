import { CreateCategory, createCustomBlock, type BlockReturningValue } from '$lib/abstract/BlocklyInterface';
import { Order } from 'blockly/javascript';

let DenseLayer = createCustomBlock(
	{
		type: 'Dense_Layer',
		tooltip: 'Print out a value to the log',
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
		colour: 120
	},
	(block, generator): BlockReturningValue => {
		const number_name = block.getFieldValue('units');

		const dropdown_optimizerchoice = block.getFieldValue('optimizerChoice');

		// TODO: Assemble javascript into the code variable.
		const code = `tf.keras.layers.Dense(${number_name}, '${dropdown_optimizerchoice}')`
		// TODO: Change Order.NONE to the correct operator precedence strength
		return [code, Order.ATOMIC];
	}
);

export const LayersCategory = CreateCategory([DenseLayer], "Layers")
