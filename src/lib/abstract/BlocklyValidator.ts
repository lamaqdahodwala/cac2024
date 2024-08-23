import * as Blockly from 'blockly';
import type { BlocklyJson } from './BlocklyInterface';

export abstract class BlockValidator {
	abstract validateBlock(): (this: Blockly.Block) => void;
	register() {
		Blockly.Extensions.register(this.getName(), this.validateBlock);
	}

	getName() {
		return this.constructor.name.toLowerCase();
	}
}

export function transformValidatorBlock(block: BlocklyJson) {
	if (!block.validator) return;

	block.validator.register();

	let { validator, ...remaining } = block;

	return {
		...remaining,
		extensions: [validator.getName()]
	};
}
