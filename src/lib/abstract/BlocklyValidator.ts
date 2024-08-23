import * as Blockly from 'blockly';
import type { BlocklyJson } from './BlocklyInterface';

export abstract class BlockValidator {
	abstract validateBlock(this: Blockly.Block): void;
	register() {
		Blockly.Extensions.register(this.getName(), this.validateBlock);
	}

	getName() {
		return this.constructor.name.toLowerCase();
	}
}

export function createValidator(callback: (this: Blockly.Block) => void){
  return class extends BlockValidator {
    validateBlock = callback
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
