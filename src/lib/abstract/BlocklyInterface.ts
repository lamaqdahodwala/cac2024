import * as Blockly from 'blockly';
import { JavascriptGenerator } from 'blockly/javascript';

export interface CustomBlock {
	getCodeForGenerator(block: Blockly.Block, generator: JavascriptGenerator): string | BlockReturningValue ;
	getJSON(): BlocklyJson;
}

export interface CustomCategory {
	getBlocks(): CustomBlock[];
	compileForToolbox(generator: JavascriptGenerator): { kind: string; type: string }[];
	getDisplayName(): string;
}

export interface Toolbox {
	kind: string;
	contents: {
		kind: string;
		type: string;
	}[];
}

export interface BlocklyJson {
	type: string;
	tooltip?: string;
	helpUrl?: string;
	message0: string;
	args0?: {
		type: string;
		name: string;
		check?: string | string[];
		align?: string;
		text?: string;
	}[];
	previousStatement?: string | null;
	nextStatement?: string | null;
	output?: string | string[];
	colour: number;
}

export interface Category {
	kind: 'category';
	name: string;
	contents: { kind: string; type: string }[];
}

export interface CategoryToolbox {
	kind: 'categoryToolbox';
	contents: Category[];
}

export function CreateCategory(
	blocks: ((new () => CustomBlock) | CustomBlock)[],
	displayName: string
) {
	class Temp implements CustomCategory {
		constructor(private blocks: CustomBlock[]) {}

		getBlocks(): CustomBlock[] {
			return this.blocks;
		}

		compileForToolbox(generator: JavascriptGenerator) {
			Blockly.defineBlocksWithJsonArray(this.blocks.map((block) => block.getJSON()));
			this.addCodeToGenerator(generator);
			return this.blocks.map((value) => ({
				kind: 'block',
				type: value.getJSON().type
			}));
		}

		addCodeToGenerator(generator: JavascriptGenerator) {
			this.blocks.forEach((value) => {
				generator.forBlock[value.getJSON().type] = (block, generator) => { return value.getCodeForGenerator(block, generator) + "\n" };
			});
		}

		getDisplayName(): string {
			return displayName;
		}
	}

	return new Temp(
		blocks.map((value) => {
			if (typeof value === 'function') return new value();
			return value;
		})
	);
}

export class ToolboxCreator {
	constructor(private categories: CustomCategory[]) {}

	getToolboxObject(generator: JavascriptGenerator): Toolbox {
		let toolBoxContents: { kind: string; type: string }[] = [];
		this.categories.forEach((value) => {
			let blocks = value.compileForToolbox(generator);
			toolBoxContents = [...toolBoxContents, ...blocks];
		});
		return {
			kind: 'flyoutToolbox',
			contents: toolBoxContents
		};
	}

	getCategoryToolboxObject(generator: JavascriptGenerator): CategoryToolbox {
		let toolbox: CategoryToolbox = { contents: [], kind: 'categoryToolbox' };
		let toolboxContents = toolbox.contents;

		this.categories.forEach((value) => {
			toolboxContents.push({
				kind: 'category',
				name: value.getDisplayName(),
				contents: value.compileForToolbox(generator)
			});
		});

		return toolbox;
	}
}

export function createCustomBlock(
	json: BlocklyJson,
	callback: (block: Blockly.Block, generator: JavascriptGenerator) => string
) {
	class Temp implements CustomBlock {
		getJSON(): BlocklyJson {
			return json;
		}
		getCodeForGenerator(block: Blockly.Block, generator: JavascriptGenerator): string | BlockReturningValue {
			return callback(block, generator);
		}
	}
	return new Temp();
}

export type BlockReturningValue = [code: string, order: number] 
