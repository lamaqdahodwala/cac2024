import * as Blockly from 'blockly';
import type { BlocklyJson, CustomBlock, MutatedBlock } from './BlocklyInterface';

export abstract class BlockCompilationStrategy {
	abstract compile(block: CustomBlock): { kind: string; type: string };
}

export class CustomBlockCompilationStrategy extends BlockCompilationStrategy {
	compile(block: CustomBlock): { kind: string; type: string } {
		Blockly.defineBlocksWithJsonArray([block.getJSON()]);
		return {
			type: block.getJSON().type,
			kind: 'block'
		};
	}
}

export class MutatedBlockCompilationStrategy extends BlockCompilationStrategy {
	compile(block: MutatedBlock): { kind: string; type: string } {
		let json = block.getJSON();

		let { mutator, ...remaining } = json;

		let newObj = {
			...remaining,
			mutator: mutator.type
		};

		Blockly.Extensions.registerMutator(
			mutator.type,
			mutator.methods,
			block.helperFunction,
			block.getBlockList()
		);

		Blockly.defineBlocksWithJsonArray([newObj]);

		return {
			kind: 'block',
			type: block.getJSON().type
		};
	}
}
