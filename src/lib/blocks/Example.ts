import {
	CreateCategory,
	createCustomBlock,
	ToolboxCreator,
	type BlocklyJson,
	type CustomBlock
} from '$lib/abstract/BlocklyInterface';
import type { Block, CodeGenerator } from 'blockly';

class ExampleBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'example',
			tooltip: '',
			message0: 'Hello world',
			colour: 100,
			previousStatement: null,
			nextStatement: null
		};
	}

	getCodeForGenerator(block: Block, generator: CodeGenerator) {
		return "console.log('hello world');";
	}
}

const AlertBlock = createCustomBlock(
	{
		type: 'alert',
		tooltip: '',
		helpUrl: '',
		message0: 'Send Alert %1 %2',
		args0: [
			{
				type: 'field_input',
				name: 'NAME'
			},
			{
				type: 'input_end_row',
				name: 'data'
			}
		],
		colour: 225,
    previousStatement: null, 
    nextStatement: null
	},
	(block, generator) => {
    let value = block.getField("NAME")
    value = value?.getValue()
		return `alert(${JSON.stringify(value)});`;
	}
);

export const ExampleCategory = CreateCategory([ExampleBlock, AlertBlock]);
