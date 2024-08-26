import * as Blockly from 'blockly';
import type { BlocklyJson } from './BlocklyInterface';

export abstract class BlockValidator {
	abstract validateBlock(this: Blockly.Block): void;
	register() {
		Blockly.Extensions.register(this.getName(), this.validateBlock);
	}

	abstract getName(): string;
}

/**
 * Create a validator, but with more flexibility
 * For basic applications, you should use the newValidator method
 */
export function customValidator(validatorName: string, callback: (block: Blockly.Block) => void) {
	return new (class extends BlockValidator {
		validateBlock(this: Blockly.Block): void {
			callback(this);
		}

		getName(): string {
			return validatorName;
		}
	})();
}

interface NewValidatorInput {
	isValid: (block: Blockly.Block) => boolean;
	invalidMessage: string;
	disableWhenInvalid: boolean;
	validatorName: string;
}

/**
 * Create a basic validator, that can disable a block
 * For more customization, use the customValidator function
 */
export function newValidator(config: NewValidatorInput) {
	return new (class extends BlockValidator {
		validateBlock(this: Blockly.Block): void {
			this.setOnChange(() => {
				let valid = config.isValid(this);
				if (!valid) {
					this.setDisabledReason(true, 'invalid');
					this.setWarningText(config.invalidMessage);
				} else {
					this.setDisabledReason(false, 'invalid');
					this.setWarningText(null);
				}
			});
		}

		getName(): string {
			return config.validatorName;
		}
	})();
}

export function transformValidatorBlock(block: BlocklyJson) {
	if (!block.validator) return block;

	block.validator.register();

	let { validator, ...remaining } = block;

	return {
		...remaining,
		extensions: [validator.getName()]
	};
}
