import * as Blockly from 'blockly';
import { MutatedBlock, type BlocklyJson, type CustomBlock } from './BlocklyInterface';

export abstract class BlockCompilationStrategy {
	abstract compile(): { kind: string; type: string };
}

export class CustomBlockCompilationStrategy extends BlockCompilationStrategy {
  constructor(private block: CustomBlock){super()}
	compile(): { kind: string; type: string } {
		Blockly.defineBlocksWithJsonArray([this.block.getJSON()]);
		return {
			type: this.block.getJSON().type,
			kind: 'block'
		};
	}
}

export class MutatedBlockCompilationStrategy extends BlockCompilationStrategy {
  constructor(private block: MutatedBlock){super()}
	compile(): { kind: string; type: string } {
		let json = this.block.getJSON();

		let { mutator, ...remaining } = json;

		let newObj = {
			...remaining,
			mutator: mutator.type
		};

		Blockly.Extensions.registerMutator(
			mutator.type,
			mutator.methods,
			this.block.helperFunction,
			this.block.getBlockList()
		);

		Blockly.defineBlocksWithJsonArray([newObj]);

		return {
			kind: 'block',
			type: this.block.getJSON().type
		};
	}
}

export function getCompilationStrategyForBlock(block: CustomBlock | MutatedBlock): BlockCompilationStrategy{
  if (block instanceof MutatedBlock){
    return new MutatedBlockCompilationStrategy(block)
  }
  return new CustomBlockCompilationStrategy(block)
}
