import { CreateCategory, createCustomBlock } from '$lib/abstract/BlocklyInterface';
import { Order } from 'blockly/javascript';

const printBlock = createCustomBlock(
	{
		type: 'print',
		tooltip: 'Print out a value to the log',
		helpUrl: '',
		message0: 'print %1',
		args0: [
			{
				type: 'input_value',
				name: 'toPrint'
			}
		],
    previousStatement: null, 
    nextStatement: null,
		colour: 135
	},
	(block, generator) => {
		const value_toprint = generator.valueToCode(block, 'toPrint', Order.ATOMIC);

		const code = `appendToLog(${value_toprint})`;
		return code;
	}
);

export const OutputCategory = CreateCategory([printBlock], "Output");
