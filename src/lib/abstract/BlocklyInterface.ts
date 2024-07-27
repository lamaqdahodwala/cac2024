import * as Blockly from 'blockly';

export interface CustomBlock {
	getCodeForGenerator(block: Blockly.Block, generator: Blockly.Generator): string;
	getJSON(): BlocklyJson;
}

export interface CustomCategory {
	getBlocks(): CustomBlock[];
	compileForToolbox(generator: Blockly.Generator): { kind: string; type: string }[];
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

		compileForToolbox(generator: Blockly.Generator) {
			Blockly.defineBlocksWithJsonArray(this.blocks.map((block) => block.getJSON()));
			this.addCodeToGenerator(generator);
			return this.blocks.map((value) => ({
				kind: 'block',
				type: value.getJSON().type
			}));
		}

		addCodeToGenerator(generator: Blockly.Generator) {
			this.blocks.forEach((value) => {
				generator.forBlock[value.getJSON().type] = value.getCodeForGenerator;
			});
		}

    getDisplayName(): string {
        return displayName
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

	getToolboxObject(generator: Blockly.Generator): Toolbox {
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

	getCategoryToolboxObject(generator: Blockly.CodeGenerator): CategoryToolbox {}
}

export function createCustomBlock(
	json: BlocklyJson,
	callback: (block: Blockly.Block, generator: Blockly.Generator) => string
) {
	class Temp implements CustomBlock {
		getJSON(): BlocklyJson {
			return json;
		}
		getCodeForGenerator(block: Blockly.Block, generator: Blockly.Generator): string {
			return callback(block, generator);
		}
	}
	return new Temp();
}
